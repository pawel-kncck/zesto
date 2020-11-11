import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        margin: '40px 0 20px 0',
    },
    number: {
        padding: '0 10px',
    },
    title: {
        flexGrow: 1,
    }
}))

const GapFill = (props) => {
    const { exIndex, title } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.number}>{exIndex + 1}.</div>
            <div className={classes.title}><Typography>{title}</Typography></div>
        </div>
    )
}

export default GapFill;