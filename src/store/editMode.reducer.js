import * as actionTypes from './editMode.actions';

const initialState = {
  active: false,
  caretPosition: {
    scIndex: null,
    exIndex: null,
    pgIndex: null,
    elIndex: null,
    caretIndex: null,
    containerPositionY: null,
    active: false,
    modeChangeQueued: false,
    insertButtonHover: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CARET_POSITION:
      return {
        ...state,
        caretPosition: {
          ...action.payload,
          active: true,
        },
      };
    case actionTypes.SET_PARAGRAPH_EDIT_MODE:
      return {
        ...state,
        caretPosition: {
          ...state.caretPosition,
          ...action.payload,
        },
      };
    case actionTypes.SET_EDIT_MODE:
      return {
        ...state,
        active: action.payload,
      };
    case actionTypes.INSERT_BUTTON_HOVER_STATE:
      return {
        ...state,
        insertButtonHover: action.payload.is_active,
      };
    default:
      return state;
  }
};

export default reducer;
