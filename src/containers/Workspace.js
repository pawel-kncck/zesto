import React, { useEffect, useState } from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
import { makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadQuizState } from '../store/quiz.actions';
import { loadAnswersState } from '../store/answers.actions';
import { loadMetadataState } from '../store/metadata.actions';
import firebase from '../firebase';
import LoadingScreen from '../componenets/LoadingScreen';
import { useHistory } from 'react-router';
// import { objectToJson } from '../utils/converters';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '795px',
    maxWidth: '90vw',
    minHeight: '500px',
    margin: 'auto',
    marginTop: '30px',
    padding: '30px',
  },
}));

function Workspace({
  loadBodyState,
  loadMetadataState,
  loadAnswersState,
  ...props
}) {
  const classes = useStyles();
  const quizId = props.match.params.id || null;
  const [bodyLoad, setBodyLoad] = useState(false);
  const [answersLoad, setAnswersLoad] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .doc(quizId)
      .onSnapshot(
        (doc) => {
          const { body, ...metadata } = doc.data();
          loadBodyState(body);
          loadMetadataState(metadata);
          setBodyLoad(body);
        },
        // () => history.push('/accessdenied')
        (error) => console.log(error)
      );
    return () => {
      unsubscribe();
    };
  }, [loadBodyState, loadMetadataState, quizId, history]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('answers')
      .doc(quizId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const { answers } = doc.data();
            loadAnswersState(answers);
            setAnswersLoad(answers);
          } else {
            loadAnswersState('{}');
            setAnswersLoad('{}');
          }
        },
        // () => history.push('/accessdenied')
        (error) => console.log(error)
      );
    return () => {
      unsubscribe();
    };
  }, [loadAnswersState, quizId, history]);

  return (
    <>
      <LowerNavbar upToDate={false} quizId={quizId} />
      {Boolean(bodyLoad) && Boolean(answersLoad) ? (
        <Paper elevation={3} className={classes.main}>
          {props.editMode ? <EditingSpace /> : <StandardView />}
        </Paper>
      ) : (
        <LoadingScreen open={true} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    editMode: state.editMode.active,
    bodyCurrentState: state.quiz,
    answersCurrentState: state.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBodyState: (body) => {
      dispatch(loadQuizState(body));
    },
    loadAnswersState: (answers) => {
      dispatch(loadAnswersState(answers));
    },
    loadMetadataState: (metadata) => {
      dispatch(loadMetadataState(metadata));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
