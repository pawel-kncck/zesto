import { combineReducers } from 'redux'
import quizReducer from './quiz.reducer';
import editModeReducer from './editMode.reducer';

export default combineReducers({
    quiz: quizReducer,
    editMode: editModeReducer
})