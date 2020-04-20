import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addComment} from '../redux/actions/postActions'
import ModalInfo from './ModalInfo'

const AddComment = ({postId}) => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.posts.message);
    const [comment,setComment] = useState(0);
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({comment,postId}))
        setComment(0)
        document.querySelector("#inp").value = "";
    }
    return (
        <div className="addcmt">
            <form onSubmit={onSubmit}>
                <input id="inp" type="text" onChange={(e) => setComment(e.target.value)}/>
                <button type="submit">Add</button>
            </form>
            {
                message ? <ModalInfo message={message}/> : null
            }
        </div>
    )
}

export default AddComment
