import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginBottom: '20px',
    },
    number: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        fontWeight: 500,
    }
})

const InputField = (props) => {
    const {
        onChange,
        value,
        label = 'Title',
        number,
    } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.number}>{number}.</Box>
            <TextField 
                fullWidth
                variant='outlined'
                label='Title'
                style={{ background: '#fff' }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    )
}

InputField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    number: PropTypes.number
} = props;


export default InputField;