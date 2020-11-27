import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { duplicateQuizById } from '../../database/functions';
import { AuthContext } from '../Authentication/contex';
import { useSnackbar } from 'notistack';
import DeleteConfirmation from './DeleteConfirmation';

const OptionsMenu = ({ id, anchorEl, type, file, onClose, name }) => {
  const [confDialogOpen, setConfDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDuplicate = () => {
    if (type === 'quiz') {
      duplicateQuizById(id, user.uid)
        .then(() => enqueueSnackbar('File duplicated', { variant: 'success' }))
        .catch((err) => console.log(err));
    } else {
      onClose();
    }
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
        <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
        {/* <MenuItem onClick={onClose}>Move</MenuItem> */}
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
    </>
  );
};

export default OptionsMenu;
