import React from 'react'
import {Link} from 'react-router-dom'
const MiniPost = ({views,title,id}) => {
    return (
        <div className="mini">
            <span>{views}</span> <span><Link to={`/post/${id}`}>{title}</Link> </span>
        </div>
    )
}

export default MiniPost
