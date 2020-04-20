import { combineReducers } from 'redux';

import { authReducer } from './authReducer'
import { postReducer } from './postReducer'
import { profileReducer} from './profileReducer'

export const rootReducer = combineReducers({
    auth:authReducer,
    posts:postReducer,
    profile:profileReducer
});
