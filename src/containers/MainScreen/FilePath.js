import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FileActionsMenu from './FilesActionsMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '52px',
    background: theme.palette.common.offWhite,
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  buttonRoot: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  label: {
    textTransform: 'none',
  },
}));

const FilePath = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(false);

  const handleActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="text"
          color="default"
          classes={{ label: classes.label, root: classes.buttonRoot }}
          endIcon={<ArrowDropDownIcon />}
          onClick={handleActionsOpen}
        >
          My Files
        </Button>
      </div>
      {Boolean(anchorEl) ? (
        <FileActionsMenu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(false)}
        />
      ) : null}
    </>
  );
};

export default FilePath;
