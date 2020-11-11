import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    root: {
        margin: '20px 0'
    },
})

const ExerciseCard = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>{children}</div>
    )
}

export default ExerciseCard;