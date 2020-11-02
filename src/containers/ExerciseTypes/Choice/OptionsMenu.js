import { ListItemIcon, MenuItem, Menu, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import { removeOptionInChoice, moveUpOptionInChoice, moveDownOptionInChoice } from '../../../store/quiz.actions';
import { connect } from 'react-redux';

const OptionsMenu =  (props) => {
    const {
        exIndex,
        opIndex,
        open,
        anchorEl,
        onClose,
        removeOption,
        moveUpOption,
        moveDownOption
    } = props

    const handleRemove = () => {
        removeOption(exIndex, opIndex);
        onClose();
    }

    const handleMoveUp = () => {
        moveUpOption(exIndex, opIndex)
        onClose();
    }

    const handleMoveDown = () => {
        moveDownOption(exIndex, opIndex)
        onClose();
    }

    const items = [
        {name: 'Delete', icon: <DeleteIcon fontSize='small' />, function: handleRemove},
        {name: 'Move up', icon: <UpIcon fontSize='small' />, function: handleMoveUp},
        {name: 'Move down', icon: <DownIcon fontSize='small' />, function: handleMoveDown}
    ]

    return (
        <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
            {items.map((item, index) => {
                return (
                <MenuItem key={index} onClick={item.function}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <Typography>{item.name}</Typography>
                </MenuItem>)
            })}
        </Menu>
    )
}

OptionsMenu.propTypes = {
    exIndex: PropTypes.number,
    pgIndex: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    removeOption: PropTypes.func,
    moveUpOption: PropTypes.func,
    moveDownOption: PropTypes.func,
    anchorEl: PropTypes.any,
}

const mapDispatchToProps = dispatch => {
    return {
        removeOption: (exIndex, opIndex) => {dispatch(removeOptionInChoice(exIndex, opIndex))},
        moveUpOption: (exIndex, opIndex) => {dispatch(moveUpOptionInChoice(exIndex, opIndex))},
        moveDownOption: (exIndex, opIndex) => {dispatch(moveDownOptionInChoice(exIndex, opIndex))},
    }
}

export default connect(null,mapDispatchToProps)(OptionsMenu);