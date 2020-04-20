import React, {useState,useEffect} from 'react'
import Post from './Post'
import {useSelector,useDispatch} from 'react-redux';
import { getPosts } from '../redux/actions/postActions'

const Categories = () => {
    const [searchVal,setSearchVal] = useState(0);
    const [searchBy,setSearchBy] = useState("title");
    const [postsH,setPostsH] = useState([])
    var posts = useSelector(state => state.posts.posts);
    var dispatch = useDispatch();

    useEffect(() => {
        if(!posts.length){
           dispatch(getPosts())
        }
    }, [])

    var mappedPosts = postsH.length ? 
        postsH.map((elem,index) => 
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
            />) 
            : 
        posts.map((elem,index) => 
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
            />);

    const onSubmit = (e) => {
        e.preventDefault()
        if(searchBy === "title"){
            let arr = posts.filter(elem => elem.title.toLowerCase().includes(searchVal) ? elem : null);
            setPostsH(arr)
        } else if(searchBy === "username"){
            let arr = posts.filter(elem => elem.username.toLowerCase().includes(searchVal) ? elem : null);
            setPostsH(arr)
        }
    }
    
    return (
        <div className="categories">
            <div className="cat-select">
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" onChange={(e) => setSearchVal(e.target.value.toLowerCase())}/> 
                    <select onChange={(e) => setSearchBy(e.target.value.toLowerCase())}>
                        <option value="title">By title</option>
                        <option value="username">By author</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
                
            </div>
            <div className="filtered">
                {mappedPosts}
            </div>
        </div>
    )
}

export default Categories
