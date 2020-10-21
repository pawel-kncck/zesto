import { Button, makeStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        height: '52px',
        background: theme.palette.primary.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        marginLeft: '10px',
        marginRight: '10px',
    }
}))

const LowerNavbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.buttonContainer}><Button size='small' color='secondary' variant='contained' startIcon={<VisibilityIcon />}>Preview</Button></div>
            <div className={classes.buttonContainer}><Button size='small' color='primary' variant='contained' startIcon={<ShareIcon />}>Share</Button></div>
        </div>
    )
}

export default LowerNavbar;