import { Avatar, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from './Authentication/contex';
import AppsIcon from '@material-ui/icons/Apps';
import app from '../firebase';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        height: 52,
        display: 'flex',
        alignItems: 'center',
        boxShadow: theme.shadows[2],
        background: theme.palette.primary.main,
        paddingRight: '10px',
    },
    brand: {
        flexGrow: 1,
        color: theme.palette.common.offWhite
    },
    homeIcon: {
        color: theme.palette.common.offWhite
    }
}))

const NavBar = () => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        console.log(user)
    }, [user])


    return (
        <div className={classes.root}>
            <IconButton className={classes.homeIcon} onClick={() => history.push('/')}><AppsIcon /></IconButton>
            <Typography variant='h6' className={classes.brand}>Zesto</Typography>
            <Avatar>P</Avatar>
            {user ? <Button onClick={() => app.auth().signOut()}>Logout</Button> : null}
        </div>
    )
}

export default NavBar;