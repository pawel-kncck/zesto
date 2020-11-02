import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginLeft: '40px',
        background: '#fff'
    }
})

const TextParagraph = (props) => {
    const { id, value, onChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                value={value}
                onChange={event => onChange(event)}
                multiline
                fullWidth
                variant='outlined'
            />
        </div>
    )
}

TextParagraph.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default TextParagraph;