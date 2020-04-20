import axios from 'axios';
import { headers } from '../../helper/helper'
import {GET_LOGGED_PROFILE,GET_OTHER_PROFILE} from '../actions/actionTypes'

export const getProfile = () => async (dispatch) => {
    const res = await axios.get('/user/get',{headers})
    dispatch({
        type:GET_LOGGED_PROFILE,
        payload:res.data
    })
}

export const getOtherProfile = id => async dispatch => {
    const res = await axios.get(`/user/profile?userId=${id}`)
    dispatch({
        type:GET_OTHER_PROFILE,
        payload:res.data
    })
}
