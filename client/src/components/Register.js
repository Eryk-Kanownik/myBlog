import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {register } from '../redux/actions/authActions'
import ModalInfo from './ModalInfo';
const Register = () => {
    const [username,setUsername] = useState(0);
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0)
    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.message)
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register({username,email,password}))
    }

    return (
        <div className="formular">
            <h1>Register to myBlog</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/><br/>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                <button type="submit">Log in</button>
            </form>
            { message ? <ModalInfo message={message}/> : null}
        </div>
    )
}

export default Register
