import axios from 'axios'
import {LOGIN_CORRECT,LOGIN_ERR,LOGOUT,REGISTER_MSG} from './actionTypes'

export const login = (data) => async (dispatch) => {
    const res = await axios.post('/user/login',data)
    if(res.data.token){
        localStorage.setItem('token',res.data.token)
        dispatch({
            type:LOGIN_CORRECT
        })
    } else {
        dispatch({
            type:LOGIN_ERR,
            payload:res.data.message
        })   
        setInterval(() => {
            dispatch({
                type:LOGIN_ERR,
                payload:null
            })
        },5000)
}
}


export const logout = () => (dispatch) => {
    dispatch({
        type:LOGOUT
    })
}

export const register = (data) => async (dispatch) => {
    const res = await axios.post('/user/register',data)
    dispatch({
        type:REGISTER_MSG,
        payload:res.data.message
    })
    setInterval(() => {
        dispatch({
            type:REGISTER_MSG,
            payload:null
        })
    },5000)
}