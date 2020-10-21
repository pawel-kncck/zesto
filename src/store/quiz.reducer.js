import * as actionTypes from './quiz.actions';

const initialState = {
    title: 'Untilted quiz',
    description: 'Quiz description',
    has_many_sections: false,
    sections: [
        {
            position: 1,
            exercises: [
                {
                    type: 'gap_fill',
                    title: 'New exercise',
                    subtitle: '',
                    has_subtitle: false,
                    is_numbered: false,
                    paragraphs: [
                        {
                            id: 'rty765rt',
                            position: 1,
                            type: 'list_item',
                            elements: [
                                {
                                    type: "text_run",
                                    content: "This is the first time"
                                },
                                {
                                    type: "gap",
                                    gap_id: "qq2w"
                                },
                                {
                                    type: "text_run",
                                    content: "ever."
                                }
                            ]
                        }
                    ],
                    gaps: [
                        {
                            "id": "qq2w",
                            "type": "short_gap",
                            "answer_key": "",
                            "placeholder": "example",
                            "default": "",
                            "disabled": false,
                            "points": 1
                        }
                    ]
                }
            ]
        }
    ]
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_EXERCISE:
            let updatedExerciseArray = [...state.sections[0].exercises]
            updatedExerciseArray.push(action.payload)

			return {
                ...state,
                sections: [
                    {
                        exercises: updatedExerciseArray
                    }
                ]
            }
        case actionTypes.ADD_ITEM:
            let updatedItemsArray = [...state.sections[0].exercises[action.exIndex]]
            updatedItemsArray.push(action.payload)

            return {
                ...state,
                sections: [
                    {
                        ...state.sections,
                        exercises: [
                            ...state.sections.exercises

                        ]
                    }
                ]
            }
		default:
			return state;
	}
}

export default reducer;