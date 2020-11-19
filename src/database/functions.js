import firebase from '../firebase';
import { initialQuizWithGapFill } from './initialContent';
import { objectToJson } from '../utils/converters';

export const createNewQuiz = (userId) => {
    const db = firebase.firestore();
    const createdDate = new Date();

    const docData = {
        author: userId,
        users: [userId],
        createdAt: createdDate,
        lastUpdatedAt: createdDate,
        body: objectToJson(initialQuizWithGapFill),
    }

    return db.collection("quizzes").add(docData)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
}

export const getQuizById = (quizId) => {
    const db = firebase.firestore();

    return db.collection("quizzes").doc(quizId).get()
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
}