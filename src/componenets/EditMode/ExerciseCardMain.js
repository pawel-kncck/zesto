import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        padding: '20px',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
    },
});

const ExerciseCardMain = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

ExerciseCardMain.propTypes = {
    children: PropTypes.node
}

export default ExerciseCardMain;