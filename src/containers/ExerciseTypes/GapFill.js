import { makeStyles, Box, TextField, Button, Switch, FormControlLabel, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react'
import { connect } from 'react-redux';
import { insertButtonHoverState } from '../../store/editMode.actions';
import { addParagraph, insertGap, toggleIsNumbered, updateExerciseTitle } from '../../store/quiz.actions';
import Paragraph from './Paragraph';

const useStyles = makeStyles(theme => ({
    topBar: {
        height: '5px',
        margin: 0,
        background: theme.palette.primary.main
    },
    editOptionsContainer: {
        height: '50px',
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
    },
    mainContainer: {
        minHeight: '400px',
        padding: '20px',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
    },
    titleBox: {
        display: 'flex',
        marginBottom: '20px',
    },
    paragraphBox: {
        marginLeft: '60px',
        marginBottom: '10px',

    },
    exNumber: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        fontWeight: 500,
    }
}))

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
            <Box className={classes.topBar}></Box>
            <Box className={classes.editOptionsContainer}>
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
                <IconButton style={{ marginLeft: '20px' }}><DeleteIcon fontSize='small' /></IconButton>
            </Box>
            <Box className={classes.mainContainer}>
                <Box className={classes.titleBox}>
                    <Box className={classes.exNumber}>{props.exIndex + 1}.</Box>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label='Title'
                        value={props.exercises[props.exIndex].title}
                        onChange={(e) => props.updateExerciseTitle(props.exIndex, e.target.value)}
                    />
                </Box>
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
                    // onMouseEnter={() => props.insertButtonSetState(true)}
                    // onMouseLeave={() => props.insertButtonSetState(false)}
                >+ Insert gap</Button>
            </Box>
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