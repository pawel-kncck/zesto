import {
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import ExerciseCard from '../../componenets/StandardMode/ExerciseCard';
import ExerciseTitle from '../../componenets/StandardMode/ExerciseTitle';
import { setAnswer } from '../../store/answers.actions';

const useStyles = makeStyles((theme) => ({
  radio: {
    marginLeft: theme.indent.secondIndent,
    fontSize: 'inherit',
    marginTop: '10px',
    marginBottom: '10px',
  },
}));

const Choice = ({ exIndex, exercise, answers, setAnswer }) => {
  const options = exercise.options;
  const id = exercise.id;
  const classes = useStyles();

  const handleChange = (event) => {
    setAnswer(id, event.target.value);
  };

  return (
    <ExerciseCard>
      <ExerciseTitle exIndex={exIndex} title={exercise.title} />
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={answers[id]}
        onChange={handleChange}
        className={classes.radio}
      >
        {options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              value={option.id}
              control={<Radio size="small" />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(Choice);
