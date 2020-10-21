import React from 'react'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { addGapFill } from '../store/quiz.actions';
import { connect } from 'react-redux';

const AddExercise = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addGapFill = () => {
        setAnchorEl(null);
        props.addGapFill();
    };

    const actions = [
        { icon: <FormatListBulletedIcon />, name: 'Choice', action: handleClose },
        { icon: <SpaceBarIcon />, name: 'Gap fill', action: addGapFill },
        { icon: <TextFieldsIcon />, name: 'Text', action: handleClose }
    ]

    return (
        <>
            <Button
                onClick={handleClick}
                variant='contained'
                color='primary'
            >+ Add new</Button>
            <Menu
                id='exercise-type-menu'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={2}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}    
            >
                {actions.map(action => (
                    <MenuItem key={action.name} onClick={action.action} >
                        <ListItemIcon fontSize='small'>{action.icon}</ListItemIcon>
                        <ListItemText primary={action.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addGapFill: () => {dispatch(addGapFill())},
    }
}

export default connect(null,mapDispatchToProps)(AddExercise);