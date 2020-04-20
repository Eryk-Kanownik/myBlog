import React,{useState} from 'react'
import Moment from 'react-moment'
import {useDispatch,useSelector} from 'react-redux'
import {editComment,deleteComment} from '../redux/actions/postActions'
import {Link} from 'react-router-dom'
const Comment = ({username,content,date,userId,postId,_id}) => {
    const dispatch = useDispatch();
    const [editMode,setEditMode] = useState(false)
    const [newContent,setNewContent] = useState(content);
    const userStateId = useSelector(state => state.profile.loggedProfile._id)
    const delCom = () => {
        dispatch(deleteComment({postId,commentId:_id}))
    }
    const editCom = (e) => {
        e.preventDefault()
        dispatch(editComment({postId,commentId:_id,newComment:newContent}))
        setEditMode(false)
    }

    return (
        <div className="comment pad">
            <div className="user">
                <div className="column">
                    <h3><Link to={`/user/${_id}`}>{username}</Link></h3>
                    <p><Moment format="HH:MM:SS DD/MM/YYYY">{date}</Moment> </p>
                </div>
                {
                    userStateId === userId ? 
                        <div>
                            {editMode ? 
                                <button className="edit" onClick={() => {
                                    setEditMode(false)
                                    setNewContent(content)
                                }
                                }>Stop Editing</button> 
                                :
                                <button className="edit" onClick={() => setEditMode(true)}>Edit</button> }
                            <button onClick={delCom}>Delete</button>
                        </div>
                    :
                    null
                }
                
            </div>
            <div className="content">
                {
                    editMode ? 
                        <form className="edit" onSubmit={editCom}>
                            <textarea defaultValue={content} onChange={(e) => setNewContent(e.target.value)}></textarea>
                            <button type="submit">Save</button>
                        </form>
                        
                    : content
                }
            </div>
        </div>
    )
}

export default Comment
