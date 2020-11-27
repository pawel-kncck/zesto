import React, { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { deleteQuizById, duplicateQuizById } from '../../database/functions';
import WarningIcon from '@material-ui/icons/Warning';
import { AuthContext } from '../Authentication/contex';
import { useSnackbar } from 'notistack';
import DeleteConfirmation from './DeleteConfirmation';

const OptionsMenu = ({ fileId, anchorEl, onClose, fileName }) => {
  const [confDialogOpen, setConfDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDuplicate = () => {
    duplicateQuizById(fileId, user.uid)
      .then(() => enqueueSnackbar('File duplicated', { variant: 'success' }))
      .catch((err) => console.log(err));
  };

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
        <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
        {/* <MenuItem onClick={onClose}>Move</MenuItem> */}
      </Menu>
      <DeleteConfirmation
        open={confDialogOpen}
        onClose={() => setConfDialogOpen(false)}
        fileId={fileId}
        fileName={fileName}
      />
    </>
  );
};

export default OptionsMenu;
