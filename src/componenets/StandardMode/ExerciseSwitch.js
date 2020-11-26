import React from 'react';
import GapFill from './GapFill';
import Text from './Text';
import Choice from '../../containers/StandardMode/Choice';
import PropTypes from 'prop-types';

const Exercise = ({ type, index, exercise }) => {
  return (
    <>
      {type === 'gap_fill' ? (
        <GapFill exIndex={index} exercise={exercise} />
      ) : null}
      {type === 'choice' ? (
        <Choice exIndex={index} exercise={exercise} />
      ) : null}
      {type === 'text' ? <Text exIndex={index} exercise={exercise} /> : null}
    </>
  );
};

Exercise.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number,
  exercise: PropTypes.object,
};

export default Exercise;
