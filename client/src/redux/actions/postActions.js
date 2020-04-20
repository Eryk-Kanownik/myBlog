import axios from 'axios'
import { GET_POSTS,GET_SINGLE_POST,LOAD_MOST_RATED,CREATE_POST, CLEAN_MESSAGE, ADD_COMMENT, ERROR, DELETE_COMMENT,EDIT_COMMENT, EDIT_POST} from './actionTypes'
import {headers} from '../../helper/helper'

export const getPosts = () => async (dispatch) => {
    const resPosts = await axios.get('/post/get')
    const resIntr = await axios.get('/post/get')
    dispatch({
        type:GET_POSTS,
        payload:resPosts.data.posts
    })
    dispatch({
        type:LOAD_MOST_RATED,
        payload:resIntr.data.posts.sort((a,b) => b.view - a.view).filter((elem,index) => index < 5)
    })
}

export const getSinglePost = (postId) => async (dispatch) => {
    const res = await axios.get(`/post/singlepost?post=${postId}`);
    dispatch({
        type:GET_SINGLE_POST,
        payload:res.data
    })
}

export const createPost = data => async dispatch => {
    const res = await axios.post('/post/create',data,{headers});
    dispatch({
        type:CREATE_POST,
        payload:res.data.message
    })
    setTimeout(() => dispatch({
        type:CREATE_POST,
        payload:null
    }),5000)
}

export const addComment = data => async dispatch => {
    const res = await axios.post(`/post/comment/${data.postId}/add`,{comment:data.comment},{headers});
    if(res.data.comments){
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        setTimeout(() => dispatch({
            type:CLEAN_MESSAGE
        }),5000)
    } else if(!res.data.comments){
        dispatch({
            type:ERROR,
            payload:res.data.message
        })
        setTimeout(() => dispatch({
            type:CLEAN_MESSAGE
        }),5000)
    }
}

export const deleteComment = data => async dispatch => {
    const res = await axios.delete(`/post/comment/${data.postId}/delete/${data.commentId}`,{headers})
    dispatch({
        type:DELETE_COMMENT,
        payload:res.data
    })
    setTimeout(() => dispatch({
        type:CLEAN_MESSAGE
    }),5000)
}

export const editComment = data => async dispatch => {
    const res = await axios.put(`/post/comment/${data.postId}/edit/${data.commentId}`,{newComment:data.newComment},{headers})
    dispatch({
        type:EDIT_COMMENT,
        payload:res.data
    })
    setTimeout(() => dispatch({
        type:CLEAN_MESSAGE
    }),5000)
}

export const editPost = data => async dispatch =>{
    const res = await axios.put(`/post/edit/${data.postId}`,{newTitle:data.newTitle,newContent:data.newContent},{headers})
    console.log(res)
    dispatch({
        type:EDIT_POST,
        payload:res.data
    })
    setTimeout(() => dispatch({
        type:CLEAN_MESSAGE
    }),5000)
}

export const deletePost = data => async dispatch =>{
    await axios.delete(`/post/delete/${data.postId}`,{headers})
}