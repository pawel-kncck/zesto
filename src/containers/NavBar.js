import { IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from './Authentication/contex';
import { Link } from 'react-router-dom';
import Avatar from '../componenets/Avatar';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '52px',
    display: 'flex',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    width: '100%',
    alignItems: 'center',
    boxShadow: theme.shadows[2],
    background: theme.palette.primary.main,
    paddingRight: '10px',
    color: theme.palette.common.offWhite,
  },
  brand: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: '20px',
    fontSize: '18px',
  },
  homeIcon: {
    color: theme.palette.common.offWhite,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(false);
  const { user } = useContext(AuthContext);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(false);
  };

  return (
    <div className={classes.root}>
      <Link to="/" className={classes.brand}>
        <Typography variant="inherit">Zesto</Typography>
      </Link>
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
