import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import AddExercise from './AddExercise';
import Exercise from './Exercise';

const useStyles = makeStyles(theme => ({
    root: {
        width: '795px',
        minHeight: '500px',
        // boxShadow: theme.shadows[3],
        margin: 'auto',
        marginTop: '30px',
        padding: '30px',
    },
    headerBox: {
        padding: '20px',
        '&:hover': {
            background: '#eee'
        },
        marginBottom: '30px'
    },
    exerciseBox: {
        padding: 0,
        '&:hover': {
            background: '#eee'
        },
        marginBottom: '30px'
    }
}))

const Workspace = (props) => {
    const classes = useStyles();
    const [exercises,setExercises] = useState([]);

    useEffect(() => {
        props.exercises ? setExercises(props.exercises) : setExercises([])
    }, [props.exercises])

    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.headerBox}>
                <Typography variant='h2'>{props.title}</Typography>
                <Typography variant='h4'>{props.desc}</Typography>
            </Box>
            {exercises.map((exercise, index) => (
                <Box key={index} className={classes.exerciseBox}>
                    <Exercise type={exercise.type} mode='edit' index={index} />
                </Box>
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

export default connect(mapStateToProps,null)(Workspace);