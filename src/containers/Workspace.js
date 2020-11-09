import { Box, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import AddExercise from './AddExercise';
import Exercise from './Exercise';
import { updateTitle, updateDescription } from '../store/quiz.actions'

const useStyles = makeStyles(theme => ({
    root: {
        width: '795px',
        minHeight: '500px',
        margin: 'auto',
        marginTop: '30px',
        padding: '30px',
    },
    headerBox: {
        paddingBottom: '20px',
        paddingTop: '20px',
        '&:hover': {
            background: '#eee'
        },
        marginBottom: '30px'
    },
    title: {
        '& .MuiInputBase-input': {
            margin: theme.spacing(1),
            fontSize: '32px',
        },
    },
    description: {
        marginTop: '10px',
        '& .MuiInputBase-input': {
            margin: theme.spacing(1),
        },
    }
}))

const Workspace = (props) => {
    const classes = useStyles();
    const [exercises,setExercises] = useState([]);

    useEffect(() => {
        props.exercises ? setExercises(props.exercises) : setExercises([])
    }, [props.exercises])

    const handleFocus = (event) => event.target.select();

    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.headerBox}>
                <TextField 
                    className={classes.title}
                    value={props.title} 
                    onChange={(e) => props.updateTitle(e.target.value)} 
                    onFocus={(e) => handleFocus(e)}
                    fullWidth />
                <TextField 
                    className={classes.description}
                    value={props.desc}
                    onChange={(e) => props.updateDescription(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                    fullWidth />
            </Box>
            {exercises.map((exercise, index) => (
                <Exercise key={index} type={exercise.type} mode='edit' index={index} />
            ))}
            <AddExercise />
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        title: state.quiz.title,
        desc: state.quiz.description,
        exercises: state.quiz.sections[0].exercises,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTitle: (value) => {dispatch(updateTitle(value))},
        updateDescription: (value) => {dispatch(updateDescription(value))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Workspace);