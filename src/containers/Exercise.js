import ExerciseCard from '../componenets/ExerciseCard';
import React from 'react';
import GapFill from './ExerciseTypes/GapFill/GapFill';
import Choice from './ExerciseTypes/Choice/Choice';
import Text from './ExerciseTypes/Text/Text';

const Exercise = ({ type, mode, index }) => {

    return (
        <ExerciseCard>
            {type === 'gap_fill' ? <GapFill mode={mode} exIndex={index} /> : null }
            {type === 'choice' ? <Choice mode={mode} exIndex={index} /> : null }
            {type === 'text' ? <Text mode={mode} exIndex={index} /> : null }
        </ExerciseCard>
    )
}

export default Exercise;