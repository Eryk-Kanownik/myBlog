import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {createPost} from '../redux/actions/postActions'
import ModalInfo from './ModalInfo'
const CreatePost = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.posts.message)
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [file,setFile] = useState(null);
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file',file);
        formData.append('title',title);
        formData.append('content',content);
        dispatch(createPost(formData))
    }
    return (
        <div className="formular create">
            <form onSubmit={onSubmit}  encType="multipart/form-data">
                <label htmlFor="text" >
                    <h2 style={{marginBottom:"10px"}}>Write here your content</h2>
                </label>
                <input type="text" onChange={(e) => setTitle(e.target.value)}  placeholder="Title..."/>
                <textarea id="text" onChange={(e) => setContent(e.target.value)} placeholder="Content..."></textarea> <br/>
                <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                <button type="submit">Create Post</button>
            </form>
            <ModalInfo message={message}/>
        </div>
    )
}

export default CreatePost
