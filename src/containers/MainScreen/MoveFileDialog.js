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

const MoveFileDialog = ({ type, tree, onClose }) => {
  const itemType = type === 'folder' ? 'folder' : 'file';
  const [currentFolder, setCurrentFolder] = useState('root');
  const [currentParent, setCurrentParent] = useState(null);
  //   const [currentTreeItem, setCurrentTreeItem] = useState(null);
  const classes = useStyles();

  const treeIds = tree.map((treeItem) => treeItem.id);
  const treeLabels = tree.map((treeItem) => treeItem.name);

  const handleClick = (treeItem) => {
    // setCurrentTreeItem(treeItem);
    setCurrentFolder(treeItem.id);
    setCurrentParent(treeItem.parentFolderId);
  };

  const handleGoBack = () => {
    if (currentParent === 'root') {
      setCurrentFolder('root');
      setCurrentParent(null);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} scroll="paper">
      <DialogTitle>
        <IconButton
          size="small"
          disabled={!currentParent}
          onClick={handleGoBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" display="inline">
          {currentFolder !== 'root'
            ? treeLabels[treeIds.indexOf(currentFolder)]
            : 'My Files'}
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
            .filter((treeItem) => treeItem.parentFolderId === currentFolder)
            .map((treeItem) => (
              <ListItem
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
        <Button variant="contained" color="primary" onClick={onClose}>
          Move here
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFileDialog;
