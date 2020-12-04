import { makeCustomId } from '../utils/generators';
import { jsonToObject } from '../utils/converters';

/*
action types
*/

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
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
export const REORDER_EXERCISE = 'REORDER_EXERCISE';
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const LOAD_QUIZ_STATE = 'LOAD_QUIZ_STATE';

/*
action creators
*/

export const loadQuizState = (json) => {
  return {
    type: LOAD_QUIZ_STATE,
    payload: jsonToObject(json),
  };
};

export const addGapFill = () => {
  return {
    type: ADD_EXERCISE,
    payload: {
      type: 'gap_fill',
      title: 'Fill the gaps in the following sentences:',
      subtitle: '',
      hasSubtitle: false,
      isNumbered: true,
      paragraphs: [
        {
          id: makeCustomId(8),
          position: 1,
          type: 'list_item',
          elements: [
            {
              type: 'text_run',
              content: '',
            },
          ],
        },
      ],
      gaps: [],
    },
  };
};

export const addChoice = () => {
  return {
    type: ADD_EXERCISE,
    payload: {
      id: makeCustomId(9),
      type: 'choice',
      title: 'Select correct answer:',
      subtitle: '',
      hasSubtitle: false,
      answerKey: [],
      options: [
        {
          id: makeCustomId(5),
          label: 'Option 1',
        },
        {
          id: makeCustomId(5),
          label: 'Option 2',
        },
      ],
    },
  };
};

export const deleteExercise = (exIndex) => {
  return {
    type: DELETE_EXERCISE,
    payload: {
      exIndex: exIndex,
    },
  };
};

export const updateTitle = (value) => {
  return {
    type: UPDATE_TITLE,
    payload: {
      value: value,
    },
  };
};

export const updateDescription = (value) => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: {
      value: value,
    },
  };
};

export const addText = () => {
  return {
    type: ADD_EXERCISE,
    payload: {
      type: 'text',
      title: 'Write answer to the question:',
      subtitle: '',
      hasSubtitle: false,
      answerKey: [],
      paragraphs: [
        {
          id: makeCustomId(5),
          content: '',
        },
      ],
    },
  };
};

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
          content: '',
        },
      ],
    },
  };
};

export const addOption = (exIndex) => {
  return {
    type: ADD_OPTION,
    exIndex: exIndex,
  };
};

export const setCorrectAnswer = (exIndex, id) => {
  return {
    type: SET_CORRECT_ANSWER,
    payload: {
      exIndex: exIndex,
      id: id,
    },
  };
};

export const removeParagraphInGapFill = (exIndex, pgIndex) => {
  return {
    type: REMOVE_PARAGRAPH,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
    },
  };
};

export const moveUpParagraphInGapFill = (exIndex, pgIndex) => {
  return {
    type: REORDER_PARAGRAPH,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
      offset: -1,
    },
  };
};

export const moveDownParagraphInGapFill = (exIndex, pgIndex) => {
  return {
    type: REORDER_PARAGRAPH,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
      offset: 1,
    },
  };
};

export const removeOptionInChoice = (exIndex, opIndex, id) => {
  return {
    type: REMOVE_OPTION,
    payload: {
      exIndex: exIndex,
      opIndex: opIndex,
      id: id,
    },
  };
};

export const moveUpExercise = (exIndex) => {
  return {
    type: REORDER_EXERCISE,
    payload: {
      exIndex: exIndex,
      offset: -1,
    },
  };
};

export const moveDownExercise = (exIndex) => {
  return {
    type: REORDER_EXERCISE,
    payload: {
      exIndex: exIndex,
      offset: 1,
    },
  };
};

export const moveUpOptionInChoice = (exIndex, opIndex) => {
  return {
    type: REORDER_OPTION,
    payload: {
      exIndex: exIndex,
      opIndex: opIndex,
      offset: -1,
    },
  };
};

export const moveDownOptionInChoice = (exIndex, opIndex) => {
  return {
    type: REORDER_OPTION,
    payload: {
      exIndex: exIndex,
      opIndex: opIndex,
      offset: 1,
    },
  };
};

export const updateTextParagraph = (exIndex, pgIndex, content) => {
  return {
    type: UPDATE_TEXT_PARAGRAPH,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
      content: content,
    },
  };
};

export const updateElement = (exIndex, pIndex, elIndex, content) => {
  return {
    type: UPDATE_ELEMENT,
    payload: {
      exIndex: exIndex,
      pIndex: pIndex,
      elIndex: elIndex,
      content: content,
    },
  };
};

export const updateOption = (exIndex, opIndex, content) => {
  return {
    type: UPDATE_OPTION,
    payload: {
      exIndex: exIndex,
      opIndex: opIndex,
      content: content,
    },
  };
};

export const insertGap = (exIndex, pgIndex, elIndex, splitIndex) => {
  return {
    type: INSERT_GAP,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
      elIndex: elIndex,
      splitIndex: splitIndex,
    },
  };
};

export const removeGap = (exIndex, pgIndex, gapId) => {
  return {
    type: REMOVE_GAP,
    payload: {
      exIndex: exIndex,
      pgIndex: pgIndex,
      gapId: gapId,
    },
  };
};

export const addGapAtCaretPosition = (exIndex, pIndex, elIndex, content) => {
  return {
    type: UPDATE_ELEMENT,
    payload: {
      exIndex: exIndex,
      pIndex: pIndex,
      elIndex: elIndex,
      content: content,
    },
  };
};

export const toggleIsNumbered = (exIndex) => {
  return {
    type: TOGGLE_IS_NUMBERED,
    payload: {
      exIndex: exIndex,
    },
  };
};

export const updateExerciseTitle = (exIndex, value) => {
  return {
    type: UPDATE_EXERCISE_TITLE,
    payload: {
      exIndex: exIndex,
      value: value,
    },
  };
};
