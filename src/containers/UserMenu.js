import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from '../firebase';
import EditProfileDialog from './EditProfileDialog';

const UserMenu = ({ anchorEl, onClose }) => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const handleSignOut = () => {
    firebase.auth().signOut();
    onClose();
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={handleProfileDialogOpen}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
      <EditProfileDialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
      />
    </>
  );
};

export default UserMenu;
