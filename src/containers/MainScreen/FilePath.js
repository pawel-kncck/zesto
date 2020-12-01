import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FileActionsMenu from './FilesActionsMenu';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '52px',
    width: '100%',
    position: 'fixed',
    background: theme.palette.common.offWhite,
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    zIndex: 100,
  },
  buttonRoot: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  label: {
    textTransform: 'none',
  },
  signBetween: {
    margin: '0 10px',
    color: '#ccc',
  },
}));

const FilePath = ({ currentLocation, tree }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(false);
  const history = useHistory();

  const generatePath = (currentFolderId, folderTree, outputArray = []) => {
    if (currentFolderId === 'root') {
      outputArray.push({ id: 'root', label: 'My Files' });
    } else {
      for (let i = 0; i < folderTree.length; i++) {
        if (folderTree[i].id === currentFolderId) {
          const id = folderTree[i].id;
          const name = folderTree[i].name;
          const parentFolderId = folderTree[i].parentFolderId;

          outputArray.push({ id: id, label: name });
          generatePath(parentFolderId, tree, outputArray);
        }
      }
    }
    return outputArray;
  };

  const path = generatePath(currentLocation, tree);

  const handleActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGoToFolder = (folderId) => {
    history.push('/f/' + folderId);
  };

  return (
    <>
      <div className={classes.root}>
        {path.reverse().map((step, index) => {
          const isLast = index === path.length - 1;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
              <Button
                variant="text"
                color="default"
                classes={{ label: classes.label, root: classes.buttonRoot }}
                endIcon={isLast ? <ArrowDropDownIcon /> : null}
                onClick={
                  isLast ? handleActionsOpen : () => handleGoToFolder(step.id)
                }
              >
                {step.label}
              </Button>
              {!isLast ? (
                <ArrowForward
                  fontSize="small"
                  className={classes.signBetween}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {Boolean(anchorEl) ? (
        <FileActionsMenu
          anchorEl={anchorEl}
          currentLocation={currentLocation}
          onClose={() => setAnchorEl(false)}
        />
      ) : null}
    </>
  );
};

export default FilePath;
