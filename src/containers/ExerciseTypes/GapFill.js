import { makeStyles, Box, Button, Switch, FormControlLabel } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux';
import { insertButtonHoverState } from '../../store/editMode.actions';
import { addParagraph, insertGap, toggleIsNumbered, updateExerciseTitle } from '../../store/quiz.actions';
import Paragraph from './Paragraph';
import TitleField from '../../componenets/TitleField';
import ExerciseCardMain from '../../componenets/ExerciseCardMain';
import ExerciseCardOptions from '../../componenets/ExerciseCardOptions';

const useStyles = makeStyles({
    exerciseOptionsContainer: {
        height: '50px',
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
    },
    paragraphBox: {
        marginLeft: '60px',
        marginBottom: '10px',
    },
});

const GapFill = (props) => {
    const classes = useStyles();
    const isNumbered = props.exercises[props.exIndex].is_numbered;

    const handleInsertGap = () => {
        const exIndex = props.caretPosition.exIndex;
        const pgIndex = props.caretPosition.pgIndex;
        const elIndex = props.caretPosition.elIndex;
        const splitIndex = props.caretPosition.caretIndex;

        props.insertGap(exIndex, pgIndex, elIndex, splitIndex);
    };

    return (
        <>
            <ExerciseCardMain>
                <TitleField
                    value={props.exercises[props.exIndex].title}
                    onChange={(e) => props.updateExerciseTitle(props.exIndex, e.target.value)}
                    number={props.exIndex + 1}
                 />
                {
                    props.exercises[props.exIndex].paragraphs.map((paragraph, pgIndex) => (
                        <Box key={pgIndex} className={classes.paragraphBox}>
                            <Paragraph exIndex={props.exIndex} pgIndex={pgIndex} paragraph={paragraph} />
                        </Box>
                    ))
                }
                <Button onClick={() => props.addParagraph(props.exIndex)}>+ Add paragraph</Button>
                <Button 
                    disabled={!props.editMode.active}
                    onClick={handleInsertGap}
                >+ Insert gap</Button>
            </ExerciseCardMain>
            <ExerciseCardOptions>
                <FormControlLabel
                    control={
                    <Switch
                        checked={isNumbered}
                        onChange={() => props.toggleIsNumbered(props.exIndex)}
                        color="primary"
                    />
                    }
                    label="Numbered"
                    labelPlacement='start'
                />
            </ExerciseCardOptions>
        </>
    )
}

const mapStateToProps = state => {
    return {
        exercises: state.quiz.sections[0].exercises,
        editMode: state.editMode,
        caretPosition: state.editMode.caretPosition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addParagraph : (exIndex) => {dispatch(addParagraph(exIndex))},
        insertGap: (exIndex, pgIndex, elIndex, splitIndex) => {dispatch(insertGap(exIndex, pgIndex, elIndex, splitIndex))},
        insertButtonSetState: (is_active) => {dispatch(insertButtonHoverState(is_active))},
        toggleIsNumbered: (exIndex) => {dispatch(toggleIsNumbered(exIndex))},
        updateExerciseTitle: (exIndex, value) => {dispatch(updateExerciseTitle(exIndex, value))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GapFill);