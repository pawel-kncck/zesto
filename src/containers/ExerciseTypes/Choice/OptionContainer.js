import { IconButton, makeStyles, Radio, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PropTypes from 'prop-types';
import OptionsMenu from './OptionsMenu';

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '40px',
        margin: '10px 0'
    },
    inputField: {
        minWidth: '400px',
        background: '#fff',
    }
})

const OptionContainer = (props) => {
    const { value, onChange } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(false);

    const handleFocus = (event) => event.target.select();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <Radio disabled />
            <TextField 
                variant='outlined' 
                className={classes.inputField}
                value={value}
                onChange={(event) => onChange(event)}
                onFocus={(event) => handleFocus(event)}
            />
            <div>
                <IconButton onClick={handleOpenMenu}>
                    <MoreHorizIcon />
                </IconButton>
            </div>
            <OptionsMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseMenu} exIndex={props.exIndex} opIndex={props.opIndex} />
        </div>
    )
}

OptionContainer.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default OptionContainer;