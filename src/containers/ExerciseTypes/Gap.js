import { IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { removeGap } from '../../store/quiz.actions'

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: '0px 5px',
        borderBottom: '1px solid #555',
        boxSizing: 'border-box'
    },
    rootFocus: {
        borderBottom: '2px solid #555',
    },
    input: {
        border: 'none',
        outline: 'none',
        fontSize: 'inherit',
        height: '21px',
        padding: 0,
    },
    iconContainer: {
        display: 'inline-block',
        width: '20px',
        height: '100%',
        position: 'relative',
    },
    icon: {
        position: 'absolute',
    }
})

const Gap = (props) => {
    const {
        id,
        exIndex,
        pgIndex,
    } = props;

    const classes = useStyles();
    const [focus, setFocus] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const active = focus || mouseOver;
    const wrapperClasses = [classes.root, active ? classes.rootFocus : null];

    const handleRemove = () => {
        props.removeGap(exIndex, pgIndex, id);
    }


    return (
        <div 
            className={wrapperClasses.join(' ')}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <input className={classes.input} id={id} type='text' />
            <div className={classes.iconContainer}>
                {active ? <IconButton onClick={handleRemove}><CloseIcon className={classes.icon} fontSize='small' /></IconButton> : null}
            </div>

        </div>
    )
}

Gap.propTypes = {
    id: PropTypes.string,
    exIndex: PropTypes.number,
    pgIndex: PropTypes.number,
}
  
const mapDispatchToProps = dispatch => {
    return {
        removeGap: (exIndex, pgIndex, gapId) => {dispatch(removeGap(exIndex, pgIndex, gapId))},
    }
}
  
export default connect(null,mapDispatchToProps)(Gap);