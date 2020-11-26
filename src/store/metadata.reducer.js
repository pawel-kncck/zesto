import * as actionTypes from './metadata.actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_METADATA_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
