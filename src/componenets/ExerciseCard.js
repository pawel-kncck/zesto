import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#eee'
    },
    topBar: {
        height: '5px',
        margin: 0,
        background: theme.palette.primary.main
    },
    actionsBar: {
        height: '50px',
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
    },
}))

const ExerciseCard = (props) => {
    const { children, onDelete='null' } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.topBar}></div>
            <div className={classes.actionsBar}>
                <IconButton style={{ marginLeft: '20px' }}><DeleteIcon fontSize='small' onClick={onDelete} /></IconButton>
            </div>
            {children}
        </div>
    )
}

ExerciseCard.propTypes = {
    children: PropTypes.node,
    onDelete: PropTypes.func
}

export default ExerciseCard;