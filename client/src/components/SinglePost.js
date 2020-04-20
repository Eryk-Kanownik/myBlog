import React,{useEffect,useState} from 'react'
import AddComment from './AddComment'
import Comment from './Comment'
import {useDispatch,useSelector} from 'react-redux'
import {getSinglePost, editPost, deletePost} from '../redux/actions/postActions'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

const SinglePost = ({match}) => {
    const [editMode,setEditMode] = useState(false);

    const [newTitle,setNewTitle] = useState("");
    const [newContent,setNewContent] = useState("")

    var postId = match.params.postId
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSinglePost(postId))
    }, [])
    var {view,date,username,title,content,userId,comments,imagePath} = useSelector(state => state.posts.singlePost);
    var loggedUserId = useSelector(state => state.profile.loggedProfile._id)
    var loggedUserIsOwner = loggedUserId === userId ? true : false

    const saveChanges = () => {
        dispatch(editPost({postId,newTitle,newContent}))
        setEditMode(false)
    }

    const delPost = () => {
        dispatch(deletePost({postId}))
        window.location.replace('/')
    }

    return (
        <div className="single-post">
            <div className="jumbotron" >
                <h1>{ editMode ? <input type="text" className="title-edit" defaultValue={title} onChange={(e) => setNewTitle(e.target.value)}/> : title}</h1>
                <p>Posted by <Link to={`/user/${userId}`}>{username}</Link></p>
                <Moment format="HH:MM:SS DD/MM/YYYY">{date}</Moment><br/>
                {
                    loggedUserIsOwner ?
                        <div>
                            <button onClick={() => editMode ? 
                                    setEditMode(false)
                                    : 
                                    setEditMode(true)
                                }>Turn {editMode ? "off" : "on"} EditMode</button>
                            { editMode ? <button onClick={delPost}>Delete Post</button> : null}
                        </div>
                        :
                        null
                }
            </div>
            {
                imagePath ?
                <div className="image">
                    <img src={window.location.origin + "/" + imagePath} alt=""/>
                </div> :
                null
            }
            <div className="content">
                {
                    editMode ? 
                        <textarea defaultValue={content} onChange={(e) => setNewContent(e.target.value)}></textarea>
                            : 
                        content
                }
                {
                editMode ? <button className="save" onClick={saveChanges}>Save</button> : null
                }
            </div>
            <div className="bar">
                <p>Viewed {view} times</p>
            </div>
            <div className="pad">
                Add comment
            </div>
            <AddComment postId={postId}/>
            <div className="comments pad">
                Comments: {comments ? comments.length : "Loading..."}
            </div>
            <div>
                {
                    comments ? comments.map(elem => <Comment username={elem.username} content={elem.comment} _id={elem._id} postId={postId} date={elem.date} userId={elem.userId}/>) : "Loading..."
                }
            </div>
        </div>
    )
}

export default SinglePost
