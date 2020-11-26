import { IconButton, makeStyles, Radio, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PropTypes from 'prop-types';
import OptionsMenu from './OptionsMenu';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '40px',
    margin: '10px 0',
  },
  inputField: {
    minWidth: '400px',
    background: '#fff',
  },
});

const OptionContainer = (props) => {
  const { id, answer_key, value, onChange, exIndex } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(false);

  const handleFocus = (event) => event.target.select();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Radio disabled />
      <TextField
        variant="outlined"
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
      <OptionsMenu
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        exIndex={exIndex}
        opIndex={props.opIndex}
      />
    </div>
  );
};

OptionContainer.propTypes = {
  id: PropTypes.string,
  answer_key: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  exIndex: PropTypes.number,
};

export default OptionContainer;
