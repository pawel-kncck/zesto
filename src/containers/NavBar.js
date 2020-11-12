import { Avatar, FormControlLabel, IconButton, makeStyles, Switch, Typography } from '@material-ui/core'
import React from 'react'
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
    root: {
        positon: 'sticky',
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

const NavBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton className={classes.homeIcon}><AppsIcon /></IconButton>
            <Typography variant='h6' className={classes.brand}>Zesto</Typography>
            <FormControlLabel
                style={{ margin: '0 20px', color: '#fafafa' }}
                control={
                <Switch
                    checked={props.user}
                    onChange={props.toggleUser}
                    color='default'
                />
                }
                label="Login"
                labelPlacement='start'
            />
            <Avatar>P</Avatar>
        </div>
    )
}

export default NavBar;