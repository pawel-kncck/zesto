import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#eee',
        margin: '20px 0'
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
    const { children, onDelete, onMoveUp, onMoveDown } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.topBar}></div>
            <div className={classes.actionsBar}>
                <IconButton onClick={onMoveUp}><UpIcon fontSize='small' /></IconButton>
                <IconButton onClick={onMoveDown}><DownIcon fontSize='small' /></IconButton>
                <IconButton onClick={onDelete}><DeleteIcon fontSize='small' /></IconButton>
            </div>
            {children}
        </div>
    )
}

ExerciseCard.propTypes = {
    children: PropTypes.node,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
}

export default ExerciseCard;