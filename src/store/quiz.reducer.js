import * as actionTypes from './quiz.actions';

const initialState = {
    title: 'Untilted quiz',
    description: 'Quiz description'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATE_FLOOVIO:
			return {
                ...state,
                saved: false,
                status: null,
                open: true,
                listId: action.payload.listId,
                name: '',
                content: {
                    json: {},
                    html: '',
                },
            }
		default:
			return state;
	}
}

export default reducer;