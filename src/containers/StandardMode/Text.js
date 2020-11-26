import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { setAnswer } from '../../store/answers.actions';
import ExerciseCard from '../../componenets/StandardMode/ExerciseCard';
import ExerciseTitle from '../../componenets/StandardMode/ExerciseTitle';

const useStyles = makeStyles((theme) => ({
  paragraph: {
    marginLeft: theme.indent.secondIndent,
  },
}));

const Text = ({ exIndex, exercise, answers, setAnswer }) => {
  const classes = useStyles();
  const paragraph = exercise.paragraphs[0];

  const handleChange = (event) => {
    setAnswer(paragraph.id, event.target.value);
  };

  return (
    <ExerciseCard>
      <ExerciseTitle exIndex={exIndex} title={exercise.title} />
      <div className={classes.paragraph}>
        <TextField
          multiline
          fullWidth
          onChange={handleChange}
          value={answers[paragraph.id]}
        />
      </div>
    </ExerciseCard>
  );
};

const mapStateToProps = (state) => {
  return {
    answers: state.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (id, value) => {
      dispatch(setAnswer(id, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Text);
