import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  makeStyles,
  FormControl,
  Button,
} from '@material-ui/core';
import firebase, { storage } from '../firebase';
import { makeCustomId } from '../utils/generators';
// import * as dbFunctions from '../.Database/BackendFunctions';
import { AuthContext } from './Authentication/contex';

const useStyles = makeStyles({
  root: {
    maxWidth: '700px',
  },
  dialogContent: {
    marginBottom: '30px',
  },
  formControl: {
    minWidth: '300px',
    margin: '30px auto 0 ',
  },
  profilePic: {
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid #ccc',
    display: 'block',
    height: '200px',
    width: '200px',
  },
  imageButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  imageinput: {
    display: 'none',
  },
  textField: {
    margin: '10px 0',
  },
});

const EditProfileDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [email, setEmail] = useState('');
  const noImageUrl =
    'https://firebasestorage.googleapis.com/v0/b/zestoo.appspot.com/o/no-image-available.png?alt=media&token=b4dbfd40-6fc9-48a1-9131-53c2d5f2fc7c';

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setProfilePicUrl(user.photoURL);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveChanges = () => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: displayName,
        photoURL: profilePicUrl,
      })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleClick = () => {
    document.getElementById('imageupload').click();
  };

  const firebaseImageUpload = (file) => {
    const fileId = makeCustomId(8);
    const storageRef = storage.ref(`/profile_pics/${fileId}`);

    storageRef
      .put(file)
      .then(() => {
        return storageRef.getDownloadURL();
      })
      .then((url) => {
        setProfilePicUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="edit-profile-dialog">Edit your profile</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <img
          src={profilePicUrl || noImageUrl}
          alt={user ? user.displayName : null}
          className={classes.profilePic}
        />
        <div className={classes.imageButtonContainer}>
          <input
            type="file"
            id="imageupload"
            name="imageupload"
            accept="image/x-png,image/gif,image/jpeg"
            className={classes.imageinput}
            onChange={(e) => firebaseImageUpload(e.target.files[0])}
          />
          <Button variant="outlined" size="small" onClick={handleClick}>
            Change image
          </Button>
        </div>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.textField}
            margin="normal"
            id="display-name"
            label="Display Name"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            fullWidth
          />
          <TextField
            disabled
            className={classes.textField}
            margin="normal"
            id="email"
            label="Email"
            type="email"
            value={email}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
