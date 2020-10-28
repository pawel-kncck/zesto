/*
action types
*/

export const SET_CARET_POSITION = 'SET_CARET_POSITION';
export const INSERT_BUTTON_HOVER_STATE = 'INSERT_BUTTON_HOVER_STATE';
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

export const setEditMode = (isActive, timeOut = 0) => {
    return dispatch => {
        dispatch(editModeSettingStarted());
        if (Boolean(timeOut)) {
            setTimeout(() => {
                dispatch(editModeSettingFinalized(isActive));
            },timeOut)
        } else {
            dispatch(editModeSettingFinalized(isActive));
        }
    }
}

export const editModeSettingStarted = () => {
    return {
        type: SET_EDIT_MODE,
        payload: {
            modeChangeQueued: true
        }
    }
}

export const editModeSettingFinalized = (isActive) => {
    return {
        type: SET_EDIT_MODE,
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