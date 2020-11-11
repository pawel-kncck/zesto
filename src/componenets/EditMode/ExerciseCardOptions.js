import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        height: '50px',
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
    },
});

const ExerciseCardOptions = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

ExerciseCardOptions.propTypes = {
    children: PropTypes.node
}

export default ExerciseCardOptions;