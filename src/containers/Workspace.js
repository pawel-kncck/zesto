import React, { useEffect, useState } from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
import { makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadQuizState } from '../store/quiz.actions';
import { loadAnswersState } from '../store/answers.actions';
import { loadMetadataState } from '../store/metadata.actions';
import { setEditMode } from '../store/editMode.actions';
import firebase from '../firebase';
import LoadingScreen from '../componenets/LoadingScreen';
import { objectToJson } from '../utils/converters';
import { ControlCamera } from '@material-ui/icons';

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
  const [lastLoad, setLastLoad] = useState(null);
  const statesCombined = {
    body: objectToJson(props.bodyState),
    answers: objectToJson(props.answersState),
  };
  const quizId = props.match.params.id || null;
  const isDatabaseSyncWithState =
    JSON.stringify(lastLoad) === JSON.stringify(statesCombined);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .doc(quizId)
      .onSnapshot((doc) => {
        const { body, answers, ...metadata } = doc.data();

        loadState(body, answers, metadata);
        setLastLoad({
          body: body || '{}',
          answers: answers || '{}',
        });
      });
    return () => {
      unsubscribe();
    };
  }, [loadState, quizId]);

  useEffect(() => {
    props.loadStandardView();
  }, []);

  return (
    <>
      <LowerNavbar upToDate={isDatabaseSyncWithState} quizId={quizId} />
      {Boolean(lastLoad) ? (
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
    bodyState: state.quiz,
    answersState: state.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadState: (body, answers, metadata) => {
      dispatch(loadQuizState(body));
      dispatch(loadAnswersState(answers));
      dispatch(loadMetadataState(metadata));
    },
    loadStandardView: () => {
      dispatch(setEditMode(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
