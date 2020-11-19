import { Button, FormControlLabel, makeStyles, Switch } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react'
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { setEditMode } from '../store/editMode.actions';

const useStyles = makeStyles(theme => ({
    root: {
        height: '52px',
        background: theme.palette.common.offWhite,
        boxShadow: theme.shadows[1],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        marginLeft: '10px',
        marginRight: '10px',
    }
}))

const LowerNavbar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControlLabel
                    className={classes.buttonContainer}
                    control={
                    <Switch
                        checked={props.editMode}
                        onChange={() => props.setEditMode(!props.editMode)}
                        color="primary"
                    />
                    }
                    label="Editing"
                    labelPlacement='start'
                />
            <div className={classes.buttonContainer}><Button size='small' color='primary' variant='contained' startIcon={<ShareIcon />}>Share</Button></div>
            <div className={classes.buttonContainer}><Button size='small' color='primary' variant='contained' startIcon={<SaveIcon />} disabled={props.upToDate}>Save</Button></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.editMode.active
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEditMode: (value) => {dispatch(setEditMode(value))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LowerNavbar);