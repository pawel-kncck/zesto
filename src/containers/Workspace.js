import React, { useEffect, useState } from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
import { makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadQuizState } from '../store/quiz.actions';
import { loadAnswersState } from '../store/answers.actions';
import firebase from '../firebase';
import LoadingScreen from '../componenets/LoadingScreen';
import { objectToJson } from '../utils/converters';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '795px',
    minHeight: '500px',
    margin: 'auto',
    marginTop: '30px',
    padding: '30px',
  },
}));

function Workspace({ loadState, ...props }) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [lastLoadBody, setLastLoadBody] = useState(null);
  const [lastLoadAnswers, setLastLoadAnswers] = useState(null);
  const quizId = props.match.params.id || null;
  const isDatabaseSyncWithState =
    lastLoadBody === objectToJson(props.quizCurrentState) &&
    lastLoadAnswers === objectToJson(props.answersCurrentState);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .doc(quizId)
      .onSnapshot((doc) => {
        loadState(doc.data().body, doc.data().answers);
        setLastLoadBody(doc.data().body || '{}');
        setLastLoadAnswers(doc.data().answers || '{}');
        setLoaded(true);
      });
    return () => {
      unsubscribe();
    };
  }, [loadState, quizId]);

  return (
    <>
      <LowerNavbar upToDate={isDatabaseSyncWithState} quizId={quizId} />
      <div>{isDatabaseSyncWithState ? 'TRUE' : 'FALSE'}</div>
      {loaded ? (
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
    quizCurrentState: state.quiz,
    answersCurrentState: state.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadState: (body, answers) => {
      dispatch(loadQuizState(body));
      dispatch(loadAnswersState(answers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
