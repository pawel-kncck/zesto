import React from 'react';
import PropTypes from 'prop-types';
import ExerciseCardMain from '../../../componenets/EditMode/ExerciseCardMain';
import TitleField from '../../../componenets/EditMode/TitleField';
import OptionContainer from './OptionContainer';
import { updateExerciseTitle, addOption, updateOption } from '../../../store/quiz.actions';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import ExerciseCardInsideButtons from '../../../componenets/EditMode/ExerciseCardInsideButtons';

const Choice = (props) => {
    const { exIndex } = props;
    return (
        <ExerciseCardMain>
            <TitleField
                value={props.exercises[props.exIndex].title}
                onChange={(e) => props.updateExerciseTitle(props.exIndex, e.target.value)}
                number={props.exIndex + 1}
            />
            {props.exercises[exIndex].options.map((option, index) => (
                <OptionContainer 
                    key={option.id}
                    id={option.id}
                    answer_key={props.exercises[props.exIndex].answer_key}
                    exIndex={props.exIndex} 
                    opIndex={index} 
                    value={option.label}
                    onChange={(event) => props.updateOption(props.exIndex, index, event.target.value)}
                />
            ))}
            <ExerciseCardInsideButtons>
                <Button variant='outlined' onClick={() => props.addOption(props.exIndex)}>+ Add option</Button>
            </ExerciseCardInsideButtons>
        </ExerciseCardMain>
    )
}

Choice.propTypes = {
    exIndex: PropTypes.number
}

const mapStateToProps = state => {
    return {
        exercises: state.quiz.sections[0].exercises,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateExerciseTitle: (exIndex, value) => {dispatch(updateExerciseTitle(exIndex, value))},
        updateOption: (exIndex, opIndex, content) => {dispatch(updateOption(exIndex, opIndex, content))},
        addOption: (exIndex) => {dispatch(addOption(exIndex))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Choice);