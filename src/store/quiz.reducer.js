import { makeCustomId } from '../utils/generators'
import * as actionTypes from './quiz.actions';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.LOAD_STATE:
			return {
                ...state,
                ...action.payload.body
            }
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
		case actionTypes.DELETE_EXERCISE:
            let newExerciseArrayDE = [...state.sections[0].exercises]
            newExerciseArrayDE.splice(action.payload.exIndex,1)

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayDE
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
		case actionTypes.UPDATE_TITLE:
			return {
                ...state,
                title: action.payload.value
            }
        case actionTypes.UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload.value
            }
		case actionTypes.UPDATE_TEXT_PARAGRAPH:
            let newExerciseArrayUTP = [...state.sections[0].exercises]
            newExerciseArrayUTP[action.payload.exIndex].paragraphs[action.payload.pgIndex].content = action.payload.content

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayUTP
                    }
                ]
            }
		case actionTypes.ADD_OPTION:
            let newExerciseArrayAO = [...state.sections[0].exercises]
            const len = newExerciseArrayAO[action.exIndex].options.length;
            newExerciseArrayAO[action.exIndex].options.push({ id: makeCustomId(5), label: 'Option ' + (len + 1) })

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayAO
                    }
                ]
            }
		case actionTypes.SET_CORRECT_ANSWER:
            let newExerciseArraySCA = [...state.sections[0].exercises]
            newExerciseArraySCA[action.payload.exIndex].answer_key[0] = action.payload.id;

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArraySCA
                    }
                ]
            }
		case actionTypes.UPDATE_OPTION:
            let newExerciseArrayUO = [...state.sections[0].exercises]
            newExerciseArrayUO[action.payload.exIndex].options[action.payload.opIndex].label = action.payload.content

			return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayUO
                    }
                ]
            }
        case actionTypes.REMOVE_OPTION:
            let newExerciseArrayROPT = [...state.sections[0].exercises];
            let answerKey = newExerciseArrayROPT[action.payload.exIndex].answer_key;
            let answerIndex = answerKey.indexOf(action.payload.id);

            if (answerIndex !== -1) {
                newExerciseArrayROPT[action.payload.exIndex].options.splice(action.payload.opIndex, 1)
                newExerciseArrayROPT[action.payload.exIndex].answer_key.splice(answerIndex, 1)
            } else {
                newExerciseArrayROPT[action.payload.exIndex].options.splice(action.payload.opIndex, 1)
            }

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayROPT
                    }
                ]
            }
        case actionTypes.REORDER_OPTION:
            let newExerciseArrayROOPT = [...state.sections[0].exercises];
            let reorderedOptionArray = newExerciseArrayROOPT[action.payload.exIndex].options;
            if (!(action.payload.opIndex === 0 && action.payload.offset === -1) && !(action.payload.index === reorderedOptionArray.length && action.payload.offset === 1)) {
                const moveSegment = (array, from, to) => {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                };
                
                moveSegment(reorderedOptionArray, action.payload.opIndex, action.payload.opIndex + action.payload.offset);

                return {
                    ...state,
                    sections: [
                        {
                            exercises: newExerciseArrayROOPT
                        }
                    ],
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.REORDER_EXERCISE:
            let newExerciseArrayRE = [...state.sections[0].exercises];
            if (!(action.payload.exIndex === 0 && action.payload.offset === -1) && !(action.payload.exIndex === newExerciseArrayRE.length && action.payload.offset === 1)) {
                const moveSegment = (array, from, to) => {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                };
                
                moveSegment(newExerciseArrayRE, action.payload.exIndex, action.payload.exIndex + action.payload.offset);

                return {
                    ...state,
                    sections: [
                        {
                            exercises: newExerciseArrayRE
                        }
                    ],
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.REMOVE_PARAGRAPH:
            let newExerciseArrayRP = [...state.sections[0].exercises]
            newExerciseArrayRP[action.payload.exIndex].paragraphs.splice(action.payload.pgIndex,1)

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayRP
                    }
                ]
            }
        case actionTypes.REORDER_PARAGRAPH:
            let newExerciseArrayROP = [...state.sections[0].exercises];
            let reorderedParagraphArray = newExerciseArrayROP[action.payload.exIndex].paragraphs;
            if (!(action.payload.pgIndex === 0 && action.payload.offset === -1) && !(action.payload.index === reorderedParagraphArray.length && action.payload.offset === 1)) {
                const moveSegment = (array, from, to) => {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                };
                
                moveSegment(reorderedParagraphArray, action.payload.pgIndex, action.payload.pgIndex + action.payload.offset);

                return {
                    ...state,
                    sections: [
                        {
                            exercises: newExerciseArrayROP
                        }
                    ],
                }
            } else {
                return {
                    ...state
                }
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
        case actionTypes.TOGGLE_IS_NUMBERED:
            let newExerciseArrayTIN = [...state.sections[0].exercises]
            newExerciseArrayTIN[action.payload.exIndex].isNumbered = !newExerciseArrayTIN[action.payload.exIndex].isNumbered

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayTIN
                    }
                ]
            }
        case actionTypes.UPDATE_EXERCISE_TITLE:
            let newExerciseArrayUET = [...state.sections[0].exercises]
            newExerciseArrayUET[action.payload.exIndex].title = action.payload.value

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayUET
                    }
                ]
            }
        case actionTypes.REMOVE_GAP:
            let newExerciseArrayRG = [...state.sections[0].exercises]
            let elements = newExerciseArrayRG[action.payload.exIndex].paragraphs[action.payload.pgIndex].elements

            const findIndex = (array, id) => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id === id) {
                        return i
                    }
                }
            }

            const gapIndex = findIndex(elements, action.payload.gapId);

            if (gapIndex > 0 && gapIndex < elements.length) {
                if (elements[gapIndex - 1].type === 'text_run' && elements[gapIndex + 1].type === 'text_run') { // merging
                    const newTextRun = {
                        id: makeCustomId(5),
                        type: 'text_run',
                        content: elements[gapIndex - 1].content.trim() + ' ' + elements[gapIndex + 1].content.trim()
                    }
                    elements.splice(gapIndex - 1, 3, newTextRun)
                } else {
                    elements.splice(gapIndex, 1)
                }
            } else {
                elements.splice(gapIndex, 1)
            }

            return {
                ...state,
                sections: [
                    {
                        exercises: newExerciseArrayRG
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
                    content: initialContent.substr(0,action.payload.splitIndex).trim()
                },
                {
                    id: makeCustomId(5),
                    type: "gap",
                },
                {
                    id: makeCustomId(5),
                    type: "text_run",
                    content: initialContent.substr(action.payload.splitIndex, initialContent.length - action.payload.splitIndex).trim()
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