import React from 'react';
import PropTypes from 'prop-types';
import ExerciseCardMain from '../../../componenets/ExerciseCardMain';
import TitleField from '../../../componenets/TitleField';
import TextParagraph from './TextParagraph';
import { updateExerciseTitle, updateTextParagraph } from '../../../store/quiz.actions';
import { connect } from 'react-redux';

const Text = (props) => {
    const { exIndex } = props;
    return (
        <ExerciseCardMain>
            <TitleField
                value={props.exercises[props.exIndex].title}
                onChange={(e) => props.updateExerciseTitle(props.exIndex, e.target.value)}
                number={props.exIndex + 1}
            />
            {props.exercises[exIndex].paragraphs.map((paragraph, index) => (
                <TextParagraph 
                    key={paragraph.id}
                    id={paragraph.id}
                    value={paragraph.content}
                    onChange={(event) => props.updateTextParagraph(exIndex, index, event.target.value)}
                />
            ))}

        </ExerciseCardMain>
    )
}

Text.propTypes = {
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
        updateTextParagraph: (exIndex, pgIndex, value) => {dispatch(updateTextParagraph(exIndex, pgIndex, value))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Text);