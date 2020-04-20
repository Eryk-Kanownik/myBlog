import {
    GET_POSTS,
    GET_SINGLE_POST,
    LOAD_MOST_RATED, 
    CREATE_POST, 
    ADD_COMMENT, 
    CLEAN_MESSAGE, 
    ERROR, 
    DELETE_COMMENT, 
    EDIT_COMMENT,
    EDIT_POST
} from '../actions/actionTypes'

var initialState = {
    posts:[],
    singlePost:{},
    mostRated:[],
    message:null
}

export const postReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_POSTS:{
            return{
                ...state,
                posts:action.payload
            }
        }
        case GET_SINGLE_POST:{
            return{
                ...state,
                singlePost:action.payload
            }
        }
        case LOAD_MOST_RATED:{
            return{
                ...state,
                mostRated:action.payload
            }
        }
        case CREATE_POST:{
            return{
                ...state,
                message:action.payload
            }
        }
        case ADD_COMMENT:{
            return{
                ...state,
                singlePost:{
                    ...state.singlePost,
                    comments:action.payload.comments
                },
                message:action.payload.message
            }
        }
        case CLEAN_MESSAGE:{
            return{
                ...state,
                message:null
            }
        }
        case ERROR:{
            return{
                ...state,
                message:action.payload
            }
        }
        case DELETE_COMMENT:{
            return{
                ...state,
                singlePost:{
                    ...state.singlePost,
                    comments:action.payload.comments
                },
                message:action.payload.message
            }
        }
        case EDIT_COMMENT:{
            return{
                ...state,
                singlePost:{
                    ...state.singlePost,
                    comments:action.payload.comments
                },
                message:action.payload.message
            }
        }
        case EDIT_POST:{
            return{
                ...state,
                singlePost:action.payload.post,
                message:action.payload.message
            }
        }
        default:{
            return state;
        }
    }
}