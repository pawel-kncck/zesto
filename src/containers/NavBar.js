import {
  Button,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from './Authentication/contex';
import AppsIcon from '@material-ui/icons/Apps';
import { useHistory } from 'react-router';
import Avatar from '../componenets/Avatar';
import UserMenu from './UserMenu';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    boxShadow: theme.shadows[2],
    background: theme.palette.primary.main,
    paddingRight: '10px',
    color: theme.palette.common.offWhite,
  },
  brand: {
    flexGrow: 1,
  },
  homeIcon: {
    color: theme.palette.common.offWhite,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.homeIcon}
        onClick={() => history.push('/')}
      >
        <AppsIcon />
      </IconButton>
      <Typography variant="h6" className={classes.brand}>
        Zesto
      </Typography>
      {user ? (
        <Tooltip title={user.displayName} placement="left">
          <IconButton onClick={handleUserMenuOpen}>
            <Avatar src={user.photoURL} displayName={user.displayName}></Avatar>
          </IconButton>
        </Tooltip>
      ) : null}
      <UserMenu anchorEl={anchorEl} onClose={handleUserMenuClose} />
    </div>
  );
};

export default NavBar;
