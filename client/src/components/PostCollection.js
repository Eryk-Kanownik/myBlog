import React,{useEffect} from 'react'
import Post from './Post'
import MostRated from './MostRated'
import MiniPost from './MiniPost'
import { getPosts } from '../redux/actions/postActions'
import { useDispatch,useSelector } from 'react-redux'

const PostCollection = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    },[])
    var posts = useSelector(state => state.posts.posts)
    var mostRated = useSelector(state => state.posts.mostRated)
    return (
        <div className="post-collection">
            <div>
                {
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
                }
            </div>
            <div className="mrp">
                <MostRated mostRated={mostRated}/>
                {
                    mostRated.map((elem,key) => <MiniPost views={elem.view} id={elem._id} key={key} title={elem.title}/>)
                }
            </div>
        </div>
    )
}

export default PostCollection
