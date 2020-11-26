import { combineReducers } from 'redux';
import quizReducer from './quiz.reducer';
import answersReducer from './answers.reducer';
import editModeReducer from './editMode.reducer';

export default combineReducers({
  quiz: quizReducer,
  answers: answersReducer,
  editMode: editModeReducer,
});
