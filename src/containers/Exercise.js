import ExerciseCard from '../componenets/EditMode/ExerciseCard';
import React from 'react';
import GapFill from './ExerciseTypes/GapFill/GapFill';
import Choice from './ExerciseTypes/Choice/Choice';
import Text from './ExerciseTypes/Text/Text';
import { moveUpExercise, moveDownExercise, deleteExercise } from '../store/quiz.actions';
import { connect } from 'react-redux';

const Exercise = ({ type, mode, index, moveUp, moveDown, deleteExercise }) => {

    return (
        <ExerciseCard onMoveUp={() => moveUp(index)} onMoveDown={() => moveDown(index)} onDelete={() => deleteExercise(index)} >
            {type === 'gap_fill' ? <GapFill mode={mode} exIndex={index} /> : null }
            {type === 'choice' ? <Choice mode={mode} exIndex={index} /> : null }
            {type === 'text' ? <Text mode={mode} exIndex={index} /> : null }
        </ExerciseCard>
    )
}

const mapStateToProps = state => {
    return {
        exercises: state.quiz.sections[0].exercises,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moveUp: (index) => {dispatch(moveUpExercise(index))},
        moveDown: (index) => {dispatch(moveDownExercise(index))},
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Exercise);