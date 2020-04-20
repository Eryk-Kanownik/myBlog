import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
const Post = ({title,username,content,date,views,id,userId,imagePath}) => {
    var newContent = content ? content.split(" ").filter((elem,index) => index < 50).join(" ") : null;
    return (
        <div className="post">
            <div className="header">
                <div>
                    <h1><Link to={`/post/${id}`}>{title}</Link></h1>
                    <div>
                        Posted by <Link to={`/user/${userId}`}>{username}</Link>
                    </div>
                    <Moment format="HH:MM:SS DD/MM/YYYY">{date}</Moment>
                    <p>{views} people have seen this</p>
                </div>
            </div>
            {
                imagePath ? <div className="image"><img src={ window.location.origin + "/" + imagePath } alt=""/></div> : null
            }
            <div className="content">
                <div>
                    <p>{newContent}...</p>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Post
