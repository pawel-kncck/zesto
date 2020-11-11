import { FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import ExerciseCard from './ExerciseCard';
import ExerciseTitle from './ExerciseTitle';

const useStyles = makeStyles(theme => ({
    radio: {
        marginLeft: theme.indent.secondIndent,
        fontSize: 'inherit',
        marginTop: '10px',
        marginBottom: '10px',
    }
}))


const GapFill = ({ exIndex, exercise }) => {
    const options = exercise.options;
    const classes = useStyles();
    const [value, setValue] = useState(null);

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <ExerciseCard>
            <ExerciseTitle exIndex={exIndex} title={exercise.title} />
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} className={classes.radio}>
                {options.map((option, index) => {
                    return <FormControlLabel key={index} value={option.label} control={<Radio size='small' />} label={option.label} />
                })}
            </RadioGroup>
        </ExerciseCard>
    )
}

export default GapFill;