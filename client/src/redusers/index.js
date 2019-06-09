import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'
import Postreducers from './Postreducers'
export default combineReducers({
auth: authReducer,
errors: errorReducer,
profile: profileReducer,
post: Postreducers
});