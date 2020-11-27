import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { deleteQuizById } from '../../database/functions';
import WarningIcon from '@material-ui/icons/Warning';
import { useSnackbar } from 'notistack';

const OptionsMenu = ({ open, onClose, fileId, fileName }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    deleteQuizById(fileId)
      .then(() => enqueueSnackbar(`File "${fileName}" was permanently deleted`))
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete confirmation</DialogTitle>
      <DialogContent>
        This file will be permanently deleted. Are you sure you want to proceed?
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onClose}>
          No, go back
        </Button>
        <Button
          color="default"
          variant="outlined"
          startIcon={<WarningIcon />}
          onClick={handleDelete}
        >
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionsMenu;
