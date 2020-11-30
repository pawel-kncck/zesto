import firebase from '../firebase';
import { makeCustomId } from '../utils/generators';
import { initialQuizWithGapFill } from './initialContent';
import { objectToJson } from '../utils/converters';

export const createNewQuiz = (userId) => {
  const db = firebase.firestore();
  const createdDate = new Date();

  const docData = {
    author: userId,
    owners: [userId],
    users: [userId],
    createdAt: createdDate,
    lastUpdatedAt: createdDate,
    body: objectToJson(initialQuizWithGapFill),
  };

  return db
    .collection('quizzes')
    .add(docData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteQuizById = (quizId) => {
  const db = firebase.firestore();

  return db
    .collection('quizzes')
    .doc(quizId)
    .delete()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const updateQuizById = (quizId, quizBodyObject, quizAnswersObject) => {
  const db = firebase.firestore();
  const updateDate = new Date();

  return db
    .collection('quizzes')
    .doc(quizId)
    .update({
      lastUpdatedAt: updateDate,
      body: objectToJson(quizBodyObject),
      answers: objectToJson(quizAnswersObject),
    })
    .then(() => `Changes saved successfully!`)
    .catch((err) => {
      throw err;
    });
};

export const getQuizById = (quizId) => {
  const db = firebase.firestore();

  return db
    .collection('quizzes')
    .doc(quizId)
    .get()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const duplicateQuizById = (quizId, userId) => {
  const quizzesRef = firebase.firestore().collection('quizzes');
  const quizRef = quizzesRef.doc(quizId);

  return quizRef
    .get()
    .then((doc) => {
      const docData = doc.data();
      const createdDate = new Date();

      const body = docData.body;

      const replacer = (match) => {
        return match + ' COPY';
      };

      const newBody = body.replace(/(?<="title":")(.*?)(?=")/, replacer);

      const newDocData = {
        author: docData.author,
        owners: [userId],
        users: [userId],
        createdAt: createdDate,
        lastUpdatedAt: createdDate,
        body: newBody,
      };
      return quizzesRef
        .add(newDocData)
        .then((res) => res)
        .catch((err) => err);
    })
    .catch((err) => {
      return err;
    });
};

export const addFolderToFileTree = (userId, label, parentId = 'root') => {
  const userDocRef = firebase.firestore().collection('users').doc(userId);
  const createdDate = new Date();

  const newFolder = {
    id: makeCustomId(9),
    owners: [userId],
    users: [userId],
    parentFolderId: parentId,
    type: 'folder',
    label: label,
    createdAt: createdDate,
  };

  return userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        userDocRef
          .update({
            fileTree: firebase.firestore.FieldValue.arrayUnion(newFolder),
          })
          .then((res) => res)
          .catch((err) => {
            throw err;
          });
      } else {
        userDocRef
          .set({
            fileTree: firebase.firestore.FieldValue.arrayUnion(newFolder),
          })
          .then((res) => res)
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteFolderFromFileTree = (userId, folderId) => {
  const userDocRef = firebase.firestore().collection('users').doc(userId);

  return userDocRef
    .get()
    .then((doc) => {
      const folderTree = doc.data().fileTree;
      const [removedItem] = folderTree.filter(
        (treeItem) => treeItem.id === folderId
      );
      const newFolderTree = folderTree
        .filter((treeItem) => treeItem.id !== folderId)
        .map((treeItem) => {
          if (treeItem.parentFolderId === removedItem.id) {
            return {
              ...treeItem,
              parentFolderId: removedItem.parentFolderId,
            };
          } else {
            return treeItem;
          }
        });

      return newFolderTree;
    })
    .then((newFolderTree) => {
      userDocRef.update({
        fileTree: newFolderTree,
      });
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
