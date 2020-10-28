import * as actionTypes from './editMode.actions';

const initialState = {
    active: false,
    modeChangeQueued: false,
    insertButtonHover: false,
    caretPosition: {
        scIndex: null,
        exIndex: null,
        pgIndex: null,
        elIndex: null,
        caretIndex: null,
        containerPositionY: null
    }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CARET_POSITION:
			return {
                ...state,
                active: true,
                caretPosition: action.payload
            }
        case actionTypes.SET_EDIT_MODE:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.INSERT_BUTTON_HOVER_STATE:
            return {
                ...state,
                insertButtonHover: action.payload.is_active
            }
		default:
			return state;
	}
}

export default reducer;