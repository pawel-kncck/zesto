import { makeCustomId } from '../utils/generators'
/*
action types
*/

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_ITEM = 'ADD_ITEM';

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
        type: ADD_ITEM,
        exIndex: exIndex,
        payload: {
            id: makeCustomId(8),
            type: 'list_item',
            elements: [
                {
                    type: 'text_run',
                    content: 'First sentence'
                }
            ]
        }
    }
}

// export const cancelFloovio = () => {
//     return { type: CANCEL_FLOOVIO }
// }