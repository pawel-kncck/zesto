import { makeCustomId } from '../utils/generators'
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
                    id: 'e654edfgh',
                    type: 'gap_fill',
                    title: 'Fill the gaps in the following sentences:',
                    subtitle: '',
                    has_subtitle: false,
                    is_numbered: true,
                    paragraphs: [
                        {
                            id: 'rty765rt',
                            position: 1,
                            type: 'list_item',
                            elements: [
                                {
                                    id: 'd3t54',
                                    type: "text_run",
                                    content: "This is the first time"
                                },
                                {
                                    id: 'et45y',
                                    type: "gap",
                                },
                                {
                                    id: 'g28rg',
                                    type: "text_run",
                                    content: "ever."
                                }
                            ]
                        }
                    ],
                    gaps: [
                        {
                            id: "et45y",
                            type: "short_gap",
                            answer_key: "",
                            placeholder: "example",
                            default: "",
                            disabled: false,
                            points: 1
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
            let newExerciseArrayAE = [...state.sections[0].exercises]
            newExerciseArrayAE.push(action.payload)

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayAE
                    }
                ]
            }
		case actionTypes.ADD_PARAGRAPH:
            let newExerciseArrayAP = [...state.sections[0].exercises]
            newExerciseArrayAP[action.exIndex].paragraphs.push(action.payload)

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayAP
                    }
                ]
            }
        case actionTypes.UPDATE_ELEMENT:
            let newExerciseArrayUE = [...state.sections[0].exercises]
            newExerciseArrayUE[action.payload.exIndex].paragraphs[action.payload.pIndex].elements[action.payload.elIndex].content = action.payload.content;

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayUE
                    }
                ]
            }
        case actionTypes.INSERT_GAP:
            let newExerciseArrayIG = [...state.sections[0].exercises]
            const initialContent = newExerciseArrayIG[action.payload.exIndex].paragraphs[action.payload.pgIndex].elements[action.payload.elIndex].content
            const newElements = [
                {
                    id: makeCustomId(5),
                    type: "text_run",
                    content: initialContent.substr(0,action.payload.splitIndex)
                },
                {
                    id: makeCustomId(5),
                    type: "gap",
                },
                {
                    id: makeCustomId(5),
                    type: "text_run",
                    content: initialContent.substr(action.payload.splitIndex, initialContent.length - action.payload.splitIndex)
                }
            ]
            newExerciseArrayIG[action.payload.exIndex].paragraphs[action.payload.pgIndex].elements.splice(action.payload.elIndex, 1, ...newElements)

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayIG
                    }
                ]
            }
		default:
			return state;
	}
}

export default reducer;