import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import {
  duplicateQuizById,
  renameFolderInFileTree,
} from '../../database/functions';
import { AuthContext } from '../Authentication/contex';
import { useSnackbar } from 'notistack';
import DeleteConfirmation from './DeleteConfirmation';
import MoveFileDialog from './MoveFileDialog';
import RenameFolderDialog from './RenameFolderDialog';

const OptionsMenu = ({ id, anchorEl, type, file, onClose, name, tree }) => {
  const [confDialogOpen, setConfDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDuplicate = () => {
    if (type === 'quiz') {
      duplicateQuizById(id, user.uid)
        .then(() => {
          enqueueSnackbar('File duplicated', { variant: 'success' });
          onClose();
        })
        .catch((err) => console.log(err));
    } else {
      onClose();
    }
  };

  const handleMoveDialogOpen = () => {
    setMoveDialogOpen(true);
  };

  const handleMoveDialogClose = () => {
    setMoveDialogOpen(false);
    onClose();
  };

  const handleRenameDialogOpen = () => {
    setRenameDialogOpen(true);
  };

  const handleRenameDialogClose = () => {
    setRenameDialogOpen(false);
    onClose();
  };

  const handleRename = (newLabel) => {
    renameFolderInFileTree(user.uid, id, newLabel);
    onClose();
  };

  return (
    <>
      <Menu
        id={id + '-options-id'}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={() => onClose()}
      >
        <MenuItem onClick={() => setConfDialogOpen(true)}>Delete</MenuItem>
        {/* <MenuItem onClick={onClose}>Rename</MenuItem> */}
        {type === 'quiz' ? (
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
        ) : null}
        <MenuItem onClick={handleMoveDialogOpen}>Move</MenuItem>
        {type === 'folder' ? (
          <MenuItem onClick={handleRenameDialogOpen}>Rename</MenuItem>
        ) : null}
      </Menu>
      <DeleteConfirmation
        open={confDialogOpen}
        onClose={() => setConfDialogOpen(false)}
        id={id}
        file={file}
        type={type}
        userId={user.uid}
        name={name}
      />
      {moveDialogOpen ? (
        <MoveFileDialog
          fileId={id}
          tree={tree}
          userId={user.uid}
          onClose={handleMoveDialogClose}
        />
      ) : null}
      {renameDialogOpen ? (
        <RenameFolderDialog
          onCancel={handleRenameDialogClose}
          onSubmit={handleRename}
        />
      ) : null}
    </>
  );
};

export default OptionsMenu;
