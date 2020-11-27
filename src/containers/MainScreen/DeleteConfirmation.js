import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {
  deleteQuizById,
  deleteFolderFromFileTree,
} from '../../database/functions';
import WarningIcon from '@material-ui/icons/Warning';
import { useSnackbar } from 'notistack';

const OptionsMenu = ({ open, type, userId, file, onClose, id, name }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFile = () => {
    deleteQuizById(id)
      .then(() => enqueueSnackbar(`File "${name}" was permanently deleted`))
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));

    onClose();
  };

  const handleDeleteFolder = () => {
    deleteFolderFromFileTree(userId, file)
      .then(() => enqueueSnackbar(`Folder "${name}" was permanently deleted`))
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));

    onClose();
  };

  const types = {
    quiz: {
      deleteFunc: handleDeleteFile,
      confMessage:
        'This file will be permanently deleted. Are you sure you want to proceed?',
    },
    folder: {
      deleteFunc: handleDeleteFolder,
      confMessage:
        'This folder will be permanently deleted, but the files inside it will remain untouched. They will be unassigned.',
    },
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete confirmation</DialogTitle>
      <DialogContent>{types[type].confMessage}</DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onClose}>
          No, go back
        </Button>
        <Button
          color="default"
          variant="outlined"
          startIcon={<WarningIcon />}
          onClick={types[type].deleteFunc}
        >
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionsMenu;
