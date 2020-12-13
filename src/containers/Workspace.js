import React, { useCallback, useEffect, useState } from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
import { makeStyles, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { loadQuizState } from '../store/quiz.actions';
import { loadAnswersState } from '../store/answers.actions';
import { loadMetadataState } from '../store/metadata.actions';
import firebase from '../firebase';
import LoadingScreen from '../componenets/LoadingScreen';
import { useHistory } from 'react-router';
import { objectToJson } from '../utils/converters';
import { updateQuizById, updateAnswersByQuizId } from '../database/functions';

const useStyles = makeStyles((theme) => ({
  mainDesktop: {
    maxWidth: '750px',
    minHeight: '500px',
    margin: 'auto',
    marginTop: '134px',
    padding: '30px',
  },
  mainMobile: {
    maxWidth: '750px',
    minHeight: '500px',
    marginTop: '104px',
    margin: 'auto',
    padding: '15px',
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
  const isDataSaved =
    answersLoad === objectToJson(props.answersCurrentState) &&
    bodyLoad === objectToJson(props.bodyCurrentState);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const mainClasss = matches ? classes.mainDesktop : classes.mainMobile;

  const handleSaveBody = useCallback(() => {
    updateQuizById(quizId, props.bodyCurrentState)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }, [quizId, props.bodyCurrentState]);

  const handleSaveAnswers = useCallback(() => {
    updateAnswersByQuizId(quizId, props.answersCurrentState)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }, [quizId, props.answersCurrentState]);

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
        (error) => console.log(error)
      );
    return () => {
      unsubscribe();
    };
  }, [loadAnswersState, quizId, history]);

  const AUTOSAVE_INTERVAL = 3000;
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (answersLoad !== objectToJson(props.answersCurrentState)) {
        handleSaveAnswers();
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [props.answersCurrentState, answersLoad, handleSaveAnswers]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (bodyLoad !== objectToJson(props.bodyCurrentState)) {
        handleSaveBody();
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [props.bodyCurrentState, bodyLoad, handleSaveBody]);

  return (
    <>
      <LowerNavbar
        isDataSaved={isDataSaved}
        quizId={quizId}
        onSaveAnswers={handleSaveAnswers}
        onSaveBody={handleSaveBody}
      />
      {Boolean(bodyLoad) && Boolean(answersLoad) ? (
        <Paper elevation={3} className={mainClasss}>
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
