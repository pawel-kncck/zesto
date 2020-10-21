
/*
action types
*/

export const CREATE_FLOOVIO = 'CREATE_FLOOVIO';
export const CANCEL_FLOOVIO = 'CANCEL_FLOOVIO';

/*
action creators
*/

export const createFloovio = (listId) => {
    return { 
        type: CREATE_FLOOVIO,
        payload: {
            listId: listId
        }
    }
}

export const cancelFloovio = () => {
    return { type: CANCEL_FLOOVIO }
}