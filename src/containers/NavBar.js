import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
    root: {
        positon: 'sticky',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        boxShadow: theme.shadows[2],
        paddingRight: '10px',
    },
    brand: {
        flexGrow: 1
    },
}))

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton><AppsIcon /></IconButton>
            <Typography variant='h6' className={classes.brand}>Zesto</Typography>
            <Avatar>P</Avatar>
        </div>
    )
}

export default NavBar;