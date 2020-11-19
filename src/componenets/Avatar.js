import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import { getInitialsFromDisplayName } from '../utils/helpers'

const useStyles = makeStyles(theme => ({
    root: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}))

const UserAvatar = ({ src, displayName = '' }) => {
    const classes = useStyles();

    return (
        <Avatar src={src} className={classes.root}>
            {displayName ? getInitialsFromDisplayName(displayName) : null}
        </Avatar>
    )
}

export default UserAvatar;