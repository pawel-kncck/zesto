/*
action types
*/

export const SET_CARET_POSITION = 'SET_CARET_POSITION';
export const INSERT_BUTTON_HOVER_STATE = 'INSERT_BUTTON_HOVER_STATE';
export const SET_PARAGRAPH_EDIT_MODE = 'SET_PARAGRAPH_EDIT_MODE';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';

/*
action creators
*/

export const setCaretPosition = (exIndex, pgIndex, elIndex, caretIndex, containerPositionY) => {
    return {
        type: SET_CARET_POSITION,
        payload: {
            scIndex: 0,
            exIndex: exIndex,
            pgIndex: pgIndex,
            elIndex: elIndex,
            caretIndex: caretIndex,
            containerPositionY: containerPositionY
        }
    }
}

export const setParagraphEditMode = (isActive, timeOut = 0) => {
    return dispatch => {
        dispatch(paragraphEditModeSettingStarted());
        if (Boolean(timeOut)) {
            setTimeout(() => {
                dispatch(paragraphEditModeSettingFinalized(isActive));
            },timeOut)
        } else {
            dispatch(paragraphEditModeSettingFinalized(isActive));
        }
    }
}

export const paragraphEditModeSettingStarted = () => {
    return {
        type: SET_PARAGRAPH_EDIT_MODE,
        payload: {
            modeChangeQueued: true
        }
    }
}

export const paragraphEditModeSettingFinalized = (isActive) => {
    return {
        type: SET_PARAGRAPH_EDIT_MODE,
        payload: {
            active: isActive,
            modeChangeQueued: false
        }
    }
}

export const insertButtonHoverState = (is_active) => {
    return {
        type: INSERT_BUTTON_HOVER_STATE,
        payload: {
            is_active: is_active
        }
    }
}

export const setEditMode = (value) => {
    return {
        type: SET_EDIT_MODE,
        payload: value
    }
}