import * as actionTypes from './answers.actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ANSWERS_STATE:
      return {
        ...action.payload,
      };
    case actionTypes.SET_ANSWER:
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      };
    case actionTypes.REMOVE_ANSWER:
      const { [action.payload]: value, ...remainingKeys } = state;
      return {
        ...remainingKeys,
      };
    default:
      return state;
  }
};

export default reducer;
