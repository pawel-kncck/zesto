import React, { useContext, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Fab, makeStyles } from '@material-ui/core';
import LoadingScreen from '../componenets/LoadingScreen';
import { AuthContext } from '../containers/Authentication/contex';
import { createNewQuiz } from '../database/functions';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'relative',
        minHeight: '200px'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const FileList = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const handleNewFile = () => {
        createNewQuiz(user.uid)
            .then(res => {
                const targetUrl = 'q/' + res.id
                history.push(targetUrl)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className={classes.root}>
            <div>List of files</div>
            <div className={classes.fab}>
                <Fab color="primary" aria-label="add" onClick={handleNewFile}>
                    <AddIcon />
                </Fab>
            </div>
            <LoadingScreen open={loading} onClose={() => setLoading(false)} />
        </div>
    )
}

export default FileList