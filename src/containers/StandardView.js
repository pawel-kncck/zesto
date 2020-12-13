import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import ExerciseSwitch from '../componenets/StandardMode/ExerciseSwitch';

const StandardView = ({ title, description, exercises }) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      {exercises.map((exercise, exIndex) => {
        return (
          <ExerciseSwitch
            key={exIndex}
            type={exercise.type}
            exercise={exercise}
            index={exIndex}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.quiz.title,
    description: state.quiz.description,
    exercises: state.quiz.sections[0].exercises,
  };
};

export default connect(mapStateToProps, null)(StandardView);
