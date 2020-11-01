import ExerciseCard from '../componenets/ExerciseCard';
import React from 'react'
import GapFill from './ExerciseTypes/GapFill';

const Exercise = ({ type, mode, index }) => {

    return (
        <ExerciseCard>
            {type === 'gap_fill' ? <GapFill mode={mode} exIndex={index} /> : null }
            {/* {type === 'choice' ? <Choice mode={mode} exIndex={index} /> : null } */}
        </ExerciseCard>
    )
}

export default Exercise;