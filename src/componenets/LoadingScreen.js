import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LoadingScreen = ({ open = true, onClose = null }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

LoadingScreen.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LoadingScreen;
