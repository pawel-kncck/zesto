import { makeCustomId } from '../utils/generators'
/*
action types
*/

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_PARAGRAPH = 'ADD_PARAGRAPH';
export const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const INSERT_GAP = 'INSERT_GAP';
export const REMOVE_GAP = 'REMOVE_GAP';
export const REORDER_PARAGRAPH = 'REORDER_PARAGRAPH';
export const TOGGLE_IS_NUMBERED = 'TOGGLE_IS_NUMBERED';
export const UPDATE_EXERCISE_TITLE = 'UPDATE_EXERCISE_TITLE';

/*
action creators
*/

export const addGapFill = () => {
    return { 
        type: ADD_EXERCISE,
        payload: {
            type: 'gap_fill',
            title: 'New exercise',
            subtitle: '',
            has_subtitle: false,
            is_numbered: false,
            paragraphs: [
                {
                    id: makeCustomId(8),
                    position: 1,
                    type: 'list_item',
                    elements: [
                        {
                            type: 'text_run',
                            content: 'First sentence'
                        }
                    ]
                }
            ],
            gaps: []
        }
    }
}

export const addParagraph = (exIndex) => {
    return { 
        type: ADD_PARAGRAPH,
        exIndex: exIndex,
        payload: {
            id: makeCustomId(8),
            type: 'list_item',
            elements: [
                {
                    type: 'text_run',
                    content: ''
                }
            ]
        }
    }
}

export const removeParagraphInGapFill = (exIndex, pgIndex) => {
    return { 
        type: REMOVE_PARAGRAPH,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex
        }
    }
}

export const moveUpParagraphInGapFill = (exIndex, pgIndex) => {
    return { 
        type: REORDER_PARAGRAPH,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex,
            offset: -1
        }
    }
}

export const moveDownParagraphInGapFill = (exIndex, pgIndex) => {
    return { 
        type: REORDER_PARAGRAPH,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex,
            offset: 1
        }
    }
}

export const updateElement = (exIndex, pIndex, elIndex, content) => {
    return {
        type: UPDATE_ELEMENT,
        payload: {
            exIndex: exIndex,
            pIndex: pIndex,
            elIndex: elIndex,
            content: content
        }
    }
}

export const insertGap = (exIndex, pgIndex, elIndex, splitIndex) => {
    return {
        type: INSERT_GAP,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex,
            elIndex: elIndex,
            splitIndex: splitIndex
        }
    }

}

export const removeGap = (exIndex, pgIndex, gapId) => {
    return {
        type: REMOVE_GAP,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex,
            gapId: gapId
        }
    }
}

export const addGapAtCaretPosition = (exIndex, pIndex, elIndex, content) => {
    return {
        type: UPDATE_ELEMENT,
        payload: {
            exIndex: exIndex,
            pIndex: pIndex,
            elIndex: elIndex,
            content: content
        }
    }
}

export const toggleIsNumbered = (exIndex) => {
    return {
        type: TOGGLE_IS_NUMBERED,
        payload: {
            exIndex: exIndex
        }
    }
}

export const updateExerciseTitle = (exIndex, value) => {
    return {
        type: UPDATE_EXERCISE_TITLE,
        payload: {
            exIndex: exIndex,
            value: value
        }
    }
}