import React, { useContext, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Fab, IconButton, List, ListItem, makeStyles } from '@material-ui/core';
import LoadingScreen from '../componenets/LoadingScreen';
import { AuthContext } from '../containers/Authentication/contex';
import { createNewQuiz, deleteQuizById } from '../database/functions';
import { useHistory } from 'react-router';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        
        const  unsubscribe = firebase.firestore().collection("quizzes").where('users', 'array-contains', user.uid)
            .onSnapshot((snapshot) => {
                let quizzesFromSnapshot = []
                snapshot.forEach(doc => {
                    quizzesFromSnapshot.push(({...doc.data(), id: doc.id}));
                });
                setQuizzes(quizzesFromSnapshot);
        });
        return () => {
            unsubscribe();
        }
    },[user.uid])

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
                <List>
                    {quizzes.map(quiz => {
                        return (
                            <ListItem key={quiz.id}>
                                <Link to={'q/' + quiz.id}>{quiz.id}</Link>
                                <IconButton onClick={() => deleteQuizById(quiz.id)}><DeleteIcon /></IconButton>
                            </ListItem>
                        )
                    })}
                </List>
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