import React, { useContext, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Fab, makeStyles } from '@material-ui/core';
import LoadingScreen from '../componenets/LoadingScreen';
import { AuthContext } from '../containers/Authentication/contex';
import { createNewQuiz } from '../database/functions';
import { useHistory } from 'react-router';
import firebase from '../firebase';
import { jsonToObject } from '../utils/converters';
import FileListItem from '../componenets/FileListItem';

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
                    const bodyObject = jsonToObject(doc.data().body)
                    quizzesFromSnapshot.push({...doc.data(), body: bodyObject, id: doc.id});
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

    const handleFileOpen = (type, id) => {
        const targetUrl = 'q/' + id
        if (type === 'quiz') {
            history.push(targetUrl)
        }
    }

    return (
        <div className={classes.root}>
            {quizzes.map(quiz => {
                return (
                    <FileListItem key={quiz.id} id={quiz.id} name={quiz.body.title} type='quiz' lastUpdated={quiz.body.lastUpdatedAt} onClick={() => handleFileOpen('quiz', quiz.id)}/>
                    // <ListItem key={quiz.id}>
                    //     <Link to={'q/' + quiz.id}>{quiz.body.title}</Link>
                    //     <IconButton onClick={() => deleteQuizById(quiz.id)}><DeleteIcon /></IconButton>
                    // </ListItem>

                )
            })}
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