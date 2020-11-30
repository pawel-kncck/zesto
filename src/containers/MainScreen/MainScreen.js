import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../containers/Authentication/contex';
import { createNewQuiz } from '../../database/functions';
import { useHistory } from 'react-router';
import firebase from '../../firebase';
import { jsonToObject } from '../../utils/converters';
import FilePath from './FilePath';
import { setEditMode } from '../../store/editMode.actions';
import { connect } from 'react-redux';
import Fab from './NewQuizFab';
import { makeStyles } from '@material-ui/core';
import FileList from './FileList';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    minHeight: '200px',
  },
});

const MainScreen = (props) => {
  const classes = useStyles();
  const currentLocation = props.match.params.folderId || 'root';
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('quizzes')
      .where('users', 'array-contains', user.uid)
      .onSnapshot((snapshot) => {
        let filesArray = [];
        snapshot.forEach((doc) => {
          const docData = doc.data();
          const id = doc.id;
          const bodyObject = jsonToObject(docData.body);

          const newFileObject = {
            id: id,
            name: bodyObject.title,
            type: 'quiz',
            lastModifiedAt: docData.lastUpdatedAt,
            owners: docData.owners,
          };

          filesArray.push(newFileObject);
        });
        setDownloads(filesArray);
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
      .onSnapshot((doc) => {
        let foldersArray = [];
        if (doc.exists) {
          const docData = doc.data();
          if (docData.fileTree) {
            foldersArray = docData.fileTree.map((fileObject) => ({
              id: fileObject.id,
              name: fileObject.label,
              type: fileObject.type,
              owners: fileObject.owners,
              parentFolderId: fileObject.parentFolderId,
            }));
            setTree(foldersArray);
          }
        }
      });
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const downloadsIds = downloads.map((download) => download.id);
    const treeItemsIds = tree.map((treeItem) => treeItem.id);

    let fileList = [];

    treeItemsIds.forEach((treeItemId, index) => {
      const treeIndex = index;
      const downloadIndex = downloadsIds.indexOf(treeItemId);

      if (downloadIndex === -1) {
        fileList.push(tree[treeIndex]);
      } else {
        const newTreeItem = {
          ...downloads[downloadIndex],
          parentFolderId: tree[treeIndex].parentFolderId,
        };
        fileList.push(newTreeItem);
      }
    });

    downloads.forEach((download) => {
      if (!treeItemsIds.includes(download.id)) {
        const newTreeItem = {
          ...download,
          parentFolderId: 'root',
        };
        fileList.push(newTreeItem);
      }
    });

    setFiles(fileList);
  }, [downloads, tree]);

  const handleNewFile = () => {
    createNewQuiz(user.uid)
      .then((res) => {
        history.push('/q/' + res.id);
        props.setEditMode(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOpen = (type, id) => {
    if (type === 'quiz') {
      history.push('/q/' + id);
      props.setEditMode(false);
    } else if (type === 'folder') {
      history.push('/f/' + id);
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <FilePath tree={tree} currentLocation={currentLocation} />
      <FileList
        userId={user.uid}
        files={files.filter((file) => file.parentFolderId === currentLocation)}
        onOpen={handleOpen}
      />
      <Fab onClick={handleNewFile} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: (value) => {
      dispatch(setEditMode(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(MainScreen);
