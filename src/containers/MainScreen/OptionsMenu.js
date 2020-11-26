import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { deleteQuizById } from '../../database/functions';
import WarningIcon from '@material-ui/icons/Warning';

const OptionsMenu = ({ fileId, anchorEl, onClose }) => {
  const [confDialogOpen, setConfDialogOpen] = useState(false);
  return (
    <>
      <Menu
        id={fileId + '-options-id'}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={() => onClose()}
      >
        <MenuItem onClick={() => setConfDialogOpen(true)}>Delete</MenuItem>
        {/* <MenuItem onClick={onClose}>Rename</MenuItem> */}
        {/* <MenuItem onClick={onClose}>Duplicate</MenuItem> */}
        {/* <MenuItem onClick={onClose}>Move</MenuItem> */}
      </Menu>
      <Dialog open={confDialogOpen}>
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          This file will be permanently deleted. Are you sure you want to
          proceed?
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setConfDialogOpen(false)}
          >
            No, go back
          </Button>
          <Button
            color="default"
            variant="outlined"
            startIcon={<WarningIcon />}
            onClick={() => deleteQuizById(fileId)}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionsMenu;
