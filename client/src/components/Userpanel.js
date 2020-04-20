import React ,{useEffect} from 'react'
import Post from './Post'
import { getOtherProfile } from '../redux/actions/profileActions';
import { useDispatch,useSelector } from 'react-redux'

const Userpanel = ({match}) => {
    const dispatch = useDispatch();
    var userId = match.params.userId;
    useEffect(() => {
        dispatch(getOtherProfile(userId))
    }, [])
    var {data,posts} = useSelector(state => state.profile.otherProfile)
    var views = posts ? posts.length > 0 ? posts.map(elem => elem.view).reduce((total,num) => total + num) : 0 : "Loading...";
    var vpp = posts ? Math.round(views/ posts.length) ? Math.round(views/posts.length) : 0 : "Loading...";
    return (
        <div className="user-panel">
            <div className="profile">
                <h2>{data ? data.username : "Loading..."}</h2>
                <div>
                    <p>Stats</p>
                    <p>All views: {views}</p>
                    <p>Average views per post: { vpp }</p>
                    <p>Posts: {posts ? posts.length : "Loading..."}</p>
                </div>
            </div>

            <div className="title-bar">
                <h3>
                    {data ? `${data.username} posts` : "Loading..."}
                </h3>
            </div>

            <div className="posts">
                {
                    posts 
                    ?
                    posts.map(
                        (elem,index) => 
                        <Post 
                            username={elem.username} 
                            date={elem.date} 
                            views={elem.view} 
                            content={elem.content} 
                            title={elem.title}
                            id={elem._id}
                            userId={elem.userId}
                            key={index}
                            imagePath={elem.imagePath}
                        />
                    )
                    :
                    <div>"Loading..."</div>
                }
            </div>
        </div>
    )
}

export default Userpanel
