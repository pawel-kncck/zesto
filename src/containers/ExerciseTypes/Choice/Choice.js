import React from 'react';
import PropTypes from 'prop-types';
import ExerciseCardMain from '../../../componenets/ExerciseCardMain';
// import ExerciseCardOptions from '../../componenets/ExerciseCardOptions';
import TitleField from '../../../componenets/TitleField';
import OptionContainer from './OptionContainer';
import { updateExerciseTitle, addOption, updateOption } from '../../../store/quiz.actions';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

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
                    exIndex={props.exIndex} 
                    opIndex={index} 
                    value={option.label}
                    onChange={(event) => props.updateOption(props.exIndex, index, event.target.value)}
                />
            ))}
            <Button onClick={() => props.addOption(props.exIndex)}>+ Add option</Button>

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