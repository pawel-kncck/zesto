import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #555',
        outline: 'none',
        margin: '0px 5px',
        fontSize: 'inherit',
        '&:focus': {
            borderBottom: '2px solid #555',
        },
    }
})

const Gap = (props) => {
    const classes = useStyles();

    const {
        id,
    } = props;

    return (
        <input className={classes.root} id={id} type='text' />
    )
}

Gap.propTypes = {
    id: PropTypes.string,
}

export default Gap;