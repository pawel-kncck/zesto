import { makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        width: '795px',
        minHeight: '500px',
        // boxShadow: theme.shadows[3],
        margin: 'auto',
        marginTop: '30px',
    }
}))

const Workspace = (props) => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Typography variant='h1'>{props.title}</Typography>
            <Typography variant='h3'>{props.desc}</Typography>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        title: state.quiz.title,
        desc: state.quiz.description,
    }
}

export default connect(mapStateToProps,null)(Workspace);