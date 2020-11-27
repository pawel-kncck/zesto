import React, { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { addFolderToFileTree } from '../../database/functions';
import { AuthContext } from '../Authentication/contex';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    paddingBottom: '10px',
  },
  textFieldContainer: {
    width: '300px',
    marginBottom: '30px',
  },
}));

const OptionsMenu = ({ folderId = null, anchorEl, onClose }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const handleCancel = () => {
    setOpen(false);
    setLabel('');
    onClose();
  };

  const handleSave = () => {
    addFolderToFileTree(user.uid, label)
      .then(() => {
        setOpen(false);
        setLabel('');
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Menu
        id={folderId + '-options-id'}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={() => onClose()}
      >
        <MenuItem onClick={() => setOpen(true)}>Add new folder</MenuItem>
        {/* <MenuItem onClick={onClose}>Move</MenuItem> */}
      </Menu>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.dialogTitle}>
          Add new folder
        </DialogTitle>
        <DialogContent>
          <div className={classes.textFieldContainer}>
            <TextField
              label="Folder name"
              fullWidth
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="default"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={!Boolean(label)}
            onClick={handleSave}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionsMenu;
