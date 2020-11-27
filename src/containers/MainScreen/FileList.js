import React, { useContext, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import LoadingScreen from '../../componenets/LoadingScreen';
import { AuthContext } from '../../containers/Authentication/contex';
import { createNewQuiz } from '../../database/functions';
import { useHistory } from 'react-router';
import firebase from '../../firebase';
import { jsonToObject } from '../../utils/converters';
import FileListItem from '../../componenets/FileListItem';
import FilePath from './FilePath';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    minHeight: '200px',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FileList = () => {
  const classes = useStyles();
  const [quizzes, setQuizzes] = useState([]);
  const [fileTree, setFileTree] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .where('users', 'array-contains', user.uid)
      .onSnapshot((snapshot) => {
        let quizzesFromSnapshot = [];
        snapshot.forEach((doc) => {
          const bodyObject = jsonToObject(doc.data().body);
          quizzesFromSnapshot.push({
            ...doc.data(),
            body: bodyObject,
            id: doc.id,
          });
        });
        setQuizzes(quizzesFromSnapshot);
      });
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(function (doc) {
        if (doc.data()) {
          setFileTree(doc.data().fileTree);
        }
      });
    return () => {
      unsubscribe();
    };
  });

  const handleNewFile = () => {
    createNewQuiz(user.uid)
      .then((res) => {
        const targetUrl = 'q/' + res.id;
        history.push(targetUrl);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFileOpen = (type, id) => {
    const targetUrl = 'q/' + id;
    if (type === 'quiz') {
      history.push(targetUrl);
    }
  };

  return (
    <>
      <FilePath />
      <div className={classes.main}>
        {fileTree.map((file) => {
          return (
            <FileListItem
              key={file.id}
              id={file.id}
              file={file}
              name={file.label}
              type="folder"
              isOwner={file.owners ? file.owners.includes(user.uid) : null}
            />
          );
        })}
        {quizzes.map((quiz) => {
          return (
            <FileListItem
              key={quiz.id}
              id={quiz.id}
              file={quiz}
              name={quiz.body.title}
              type="quiz"
              isOwner={quiz.owners.includes(user.uid)}
              lastUpdated={quiz.body.lastUpdatedAt}
              onClick={() => handleFileOpen('quiz', quiz.id)}
            />
          );
        })}
        <div className={classes.fab}>
          <Tooltip title="Add new quiz" placement="left" arrow>
            <Fab color="primary" aria-label="add" onClick={handleNewFile}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <LoadingScreen open={loading} onClose={() => setLoading(false)} />
      </div>
    </>
  );
};

export default FileList;
