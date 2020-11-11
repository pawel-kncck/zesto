import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import ExerciseCard from './ExerciseCard';
import ExerciseTitle from './ExerciseTitle';

const useStyles = makeStyles(theme => ({
    paragraph: {
        marginLeft: theme.indent.secondIndent
    }
}))


const Text = ({ exIndex, exercise }) => {
    const classes = useStyles();

    return (
        <ExerciseCard>
            <ExerciseTitle exIndex={exIndex} title={exercise.title} />
            <div className={classes.paragraph}>
                <TextField multiline fullWidth />
            </div>
        </ExerciseCard>
    )
}

export default Text;