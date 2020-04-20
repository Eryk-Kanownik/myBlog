import {GET_LOGGED_PROFILE,GET_OTHER_PROFILE} from '../actions/actionTypes';

var initialState = {
    loggedProfile:{},
    otherProfile:{
        username:"",
        email:"",
        _id:""
    },
}

export const profileReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_LOGGED_PROFILE:{
            return{
                ...state,
                loggedProfile:action.payload
            }
        }
        case GET_OTHER_PROFILE:{
            return{
                ...state,
                otherProfile:{
                    data:action.payload.user,
                    posts:action.payload.posts
                }
            }
        }
        default:{
            return state;
        } 
    }
}

