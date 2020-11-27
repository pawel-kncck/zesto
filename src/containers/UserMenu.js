import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import firebase from '../firebase';

const UserMenu = ({ anchorEl, onClose }) => {
  const handleSignOut = () => {
    firebase.auth().signOut();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
    </Menu>
  );
};

export default UserMenu;
