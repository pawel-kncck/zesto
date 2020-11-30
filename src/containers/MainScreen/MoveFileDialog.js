import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { moveFileToFolder } from '../../database/functions';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '400px',
    height: '500px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const MoveFileDialog = ({ fileId, userId, tree, onClose }) => {
  const [currentTreeItem, setCurrentTreeItem] = useState({
    id: 'root',
    label: 'My Files',
    parentFolderId: null,
  });
  const classes = useStyles();

  const handleClick = (treeItem) => {
    const newTreeItem = {
      id: treeItem.id,
      label: treeItem.id === 'root' ? 'My Files' : treeItem.name,
      parentFolderId: treeItem.id === 'root' ? null : treeItem.parentFolderId,
    };
    setCurrentTreeItem(newTreeItem);
  };

  const handleGoBack = () => {
    if (currentTreeItem.parentFolderId === 'root') {
      setCurrentTreeItem({
        id: 'root',
        label: 'My Files',
        parentFolderId: null,
      });
    } else {
      const [targetItem] = tree.filter(
        (treeItem) => treeItem.id === currentTreeItem.parentFolderId
      );
      setCurrentTreeItem({
        id: targetItem.id,
        label: targetItem.name,
        parentFolderId: targetItem.parentFolderId,
      });
    }
  };

  const handleMove = () => {
    const [item] = tree.filter((treeItem) => treeItem.id === fileId);

    if (item.parentFolderId !== currentTreeItem.id) {
      moveFileToFolder(userId, item.id, currentTreeItem.id);
    }

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} scroll="paper">
      <DialogTitle>
        <IconButton
          size="small"
          disabled={!currentTreeItem.parentFolderId}
          onClick={handleGoBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="body1"
          display="inline"
          style={{ marginLeft: '10px' }}
        >
          {currentTreeItem.label}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers classes={{ root: classes.content }}>
        <List>
          {tree
            .filter(
              (treeItem) => treeItem.parentFolderId === currentTreeItem.id
            )
            .map((treeItem, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleClick(treeItem)}
                disabled={treeItem.type !== 'folder'}
              >
                <ListItemIcon>
                  {treeItem.type === 'folder' ? (
                    <FolderIcon />
                  ) : (
                    <AssignmentIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={treeItem.name} />
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleMove}>
          Move here
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFileDialog;
