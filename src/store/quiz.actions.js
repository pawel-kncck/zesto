import { makeCustomId } from '../utils/generators'

/*
action types
*/

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const UPDATE_EXERCISE_TITLE = 'UPDATE_EXERCISE_TITLE';
export const ADD_PARAGRAPH = 'ADD_PARAGRAPH';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';
export const REMOVE_PARAGRAPH = 'REMOVE_PARAGRAPH';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const UPDATE_TEXT_PARAGRAPH = 'UPDATE_TEXT_PARAGRAPH';
export const INSERT_GAP = 'INSERT_GAP';
export const REMOVE_GAP = 'REMOVE_GAP';
export const REORDER_PARAGRAPH = 'REORDER_PARAGRAPH';
export const TOGGLE_IS_NUMBERED = 'TOGGLE_IS_NUMBERED';
export const REMOVE_OPTION = 'REMOVE_OPTION';
export const REORDER_OPTION = 'REORDER_OPTION';
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';

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

export const addChoice = () => {
    return { 
        type: ADD_EXERCISE,
        payload: {
            type: 'choice',
            title: 'New exercise',
            subtitle: '',
            has_subtitle: false,
            answer_key: [],
            options: [
                {
                    id: makeCustomId(5),
                    label: 'Option 1'
                },
                {
                    id: makeCustomId(5),
                    label: 'Option 2'
                }
            ],
        }
    }
}



export const addText = () => {
    return { 
        type: ADD_EXERCISE,
        payload: {
            type: 'text',
            title: 'Write answer to the question:',
            subtitle: '',
            has_subtitle: false,
            answer_key: [],
            paragraphs: [
                {
                    id: makeCustomId(5),
                    content: ''
                },
            ],
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

export const addOption = (exIndex) => {
    return { 
        type: ADD_OPTION,
        exIndex: exIndex
    }
}

export const setCorrectAnswer = (exIndex, id) => {
    return { 
        type: SET_CORRECT_ANSWER,
        payload: {
            exIndex: exIndex,
            id: id
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


export const removeOptionInChoice = (exIndex, opIndex, id) => {
    return { 
        type: REMOVE_OPTION,
        payload: {
            exIndex: exIndex,
            opIndex: opIndex,
            id: id
        }
    }
}

export const moveUpOptionInChoice = (exIndex, opIndex) => {
    return { 
        type: REORDER_OPTION,
        payload: {
            exIndex: exIndex,
            opIndex: opIndex,
            offset: -1
        }
    }
}

export const moveDownOptionInChoice = (exIndex, opIndex) => {
    return { 
        type: REORDER_OPTION,
        payload: {
            exIndex: exIndex,
            opIndex: opIndex,
            offset: 1
        }
    }
}

export const updateTextParagraph = (exIndex, pgIndex, content) => {
    return {
        type: UPDATE_TEXT_PARAGRAPH,
        payload: {
            exIndex: exIndex,
            pgIndex: pgIndex,
            content: content
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


export const updateOption = (exIndex, opIndex, content) => {
    return {
        type: UPDATE_OPTION,
        payload: {
            exIndex: exIndex,
            opIndex: opIndex,
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