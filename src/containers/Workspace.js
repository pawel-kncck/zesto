import React, { useEffect, useState } from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
import { makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadState } from '../store/quiz.actions';
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
  const [lastLoadContent, setLastLoadContent] = useState(null);
  const quizId = props.match.params.id || null;
  const isDatabaseSyncWithState =
    lastLoadContent === objectToJson(props.quizCurrentState);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .doc(quizId)
      .onSnapshot((doc) => {
        loadState(doc.data().body);
        setLastLoadContent(doc.data().body);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadState: (json) => {
      dispatch(loadState(json));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
