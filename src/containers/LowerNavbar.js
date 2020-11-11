import { Button, FormControlLabel, makeStyles, Switch } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';

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

const LowerNavbar = () => {
    const classes = useStyles();
    const [edit, setEdit] = useState(true);

    return (
        <div className={classes.root}>
            <FormControlLabel
                    className={classes.buttonContainer}
                    control={
                    <Switch
                        checked={edit}
                        onChange={() => setEdit(!edit)}
                        color="primary"
                    />
                    }
                    label="Editing"
                    labelPlacement='start'
                />
            <div className={classes.buttonContainer}><Button size='small' color='primary' variant='contained' startIcon={<ShareIcon />}>Share</Button></div>
            <div className={classes.buttonContainer}><Button size='small' color='primary' variant='contained' startIcon={<SaveIcon />}>Save</Button></div>
        </div>
    )
}

export default LowerNavbar;