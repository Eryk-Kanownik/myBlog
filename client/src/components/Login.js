import React, {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../redux/actions/authActions';
import ModalInfo from './ModalInfo';

const Login = (props) => {
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0)
    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.message)
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email,password}));
    }

    return (
        <div className="formular">
            <h1>Log in to myBlog</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                <button type="submit">Log in</button>
            </form>
            { message ? <ModalInfo message={message}/> : null}
        </div>
    )
}

export default Login
