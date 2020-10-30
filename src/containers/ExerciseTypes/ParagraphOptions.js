import { ListItemIcon, MenuItem, Menu, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import { removeParagraphInGapFill, moveUpParagraphInGapFill, moveDownParagraphInGapFill } from '../../store/quiz.actions';
import { connect } from 'react-redux';

const ParagraphOptionsMenu =  (props) => {
    const {
        exIndex,
        pgIndex,
        open,
        anchorEl,
        onClose,
        removeParagraph,
        moveUpParagraph,
        moveDownParagraph
    } = props

    const handleRemove = () => {
        removeParagraph(exIndex, pgIndex);
        onClose();
    }

    const handleMoveUp = () => {
        moveUpParagraph(exIndex, pgIndex)
        onClose();
    }

    const handleMoveDown = () => {
        moveDownParagraph(exIndex, pgIndex)
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

ParagraphOptionsMenu.propTypes = {
    exIndex: PropTypes.number,
    pgIndex: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    removeParagraph: PropTypes.func,
    moveUpParagraph: PropTypes.func,
    moveDownParagraph: PropTypes.func,
    anchorEl: PropTypes.any,
}

const mapDispatchToProps = dispatch => {
    return {
        removeParagraph: (exIndex, pgIndex) => {dispatch(removeParagraphInGapFill(exIndex, pgIndex))},
        moveUpParagraph: (exIndex, pgIndex) => {dispatch(moveUpParagraphInGapFill(exIndex, pgIndex))},
        moveDownParagraph: (exIndex, pgIndex) => {dispatch(moveDownParagraphInGapFill(exIndex, pgIndex))},
    }
}

export default connect(null,mapDispatchToProps)(ParagraphOptionsMenu);