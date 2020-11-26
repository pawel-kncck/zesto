import { jsonToObject } from '../utils/converters';

/*
action types
*/

export const LOAD_ANSWERS_STATE = 'LOAD_ANSWERS_STATE';
export const SET_ANSWER = 'SET_ANSWER';

/*
action creators
*/

export const loadAnswersState = (json) => {
  let payload;

  if (json) {
    payload = jsonToObject(json);
  } else {
    payload = {};
  }

  return {
    type: LOAD_ANSWERS_STATE,
    payload: payload,
  };
};

export const setAnswer = (id, value) => {
  return {
    type: SET_ANSWER,
    payload: {
      id: id,
      value: value,
    },
  };
};
