import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab, makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const NewQuizFab = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Add new quiz" placement="left" arrow>
        <Fab color="primary" aria-label="add" onClick={onClick}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default NewQuizFab;
