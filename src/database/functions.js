import firebase from '../firebase';
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

      function replacer(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        console.log(match);
        return match + ' COPY';
      }
      // let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);

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
