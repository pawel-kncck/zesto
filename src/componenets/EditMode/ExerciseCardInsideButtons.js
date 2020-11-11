import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    root: {
        marginTop: '40px'
    }
})

const ExerciseCardInsideButtons = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.root}>{children}</div>
}

export default ExerciseCardInsideButtons;