import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

const RenameFolderDialog = ({ onCancel, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Insert new name:</DialogTitle>
      <DialogContent>
        <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          color="default"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleSubmit}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameFolderDialog;
