import { LOGIN_CORRECT,LOGIN_ERR,LOGOUT, REGISTER_MSG} from '../actions/actionTypes';

var initialState = {
    message:null,
    token:localStorage.getItem('token'),
}

export const authReducer = (state = initialState,action) => {
    switch(action.type){
        case LOGIN_CORRECT:{
            window.location.replace('/')
            return {
                ...state,
                token:localStorage.token
            }
        }
        case LOGIN_ERR:{
            return {
                ...state,
                message:action.payload
            }
        }
        case LOGOUT:{
            localStorage.removeItem('token')
            return {
                ...state,
                token:localStorage.token
            }
        }
        case REGISTER_MSG:{
            return {
                ...state,
                message:action.payload
            }
        }
        default:
            return state
    }
}