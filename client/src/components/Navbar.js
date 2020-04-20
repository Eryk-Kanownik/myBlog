import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'

const Navbar = () => {
    const [dropdown,setDropdown] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token);
    const {username,_id} = useSelector(state => state.profile.loggedProfile)
    const tokenExist = token ? 
    (
        <ul>
            <li onClick={() => setDropdown(false)}>
                <Link to={`/user/${_id}`}>{username ? username : "Loading..."}</Link>
            </li>
            <li onClick={() =>{
                 setDropdown(false)
                 dispatch(logout())
                 }}>
                <a>Logout</a>
            </li>
        </ul>
        
    )
    :
    (
        <ul>
            <li onClick={() => setDropdown(false)}>
                <Link to="/login">Login</Link>
            </li>
            <li onClick={() => setDropdown(false)}>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    )

    return (
        <div className="navbar">
            <ul>
                <li className="dropdown" onClick={() => setDropdown(!dropdown)}>
                    Menu
                </li>
                <li className="dropdown-elem" onClick={() => setDropdown(false)} style={dropdown ? {display:"block"} : {display:"none"}}>
                    <Link to="/">myBlog</Link>
                </li>
                {
                    token ? 
                        <li className="dropdown-elem" onClick={() => setDropdown(false)} style={dropdown ? {display:"block"} : {display:"none"}}>
                            <Link to="/create">Create Post</Link>
                        </li>
                    :
                        null
                }
                <li className="dropdown-elem" onClick={() => setDropdown(false)} style={dropdown ? {display:"block"} : {display:"none"}}>
                    <Link to="/filter">Filter</Link>
                </li>
            </ul>
            {tokenExist}
        </div>
    )
}

export default Navbar
