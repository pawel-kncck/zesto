import { makeCustomId } from '../utils/generators'
/*
action types
*/

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_PARAGRAPH = 'ADD_PARAGRAPH';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const INSERT_GAP = 'INSERT_GAP';

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
                    content: 'New paragraph...'
                }
            ]
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