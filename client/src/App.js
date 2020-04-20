import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import PostCollection from './components/PostCollection';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { getProfile } from './redux/actions/profileActions'

import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
import Userpanel from './components/Userpanel';
import CreatePost from './components/CreatePost';
import SinglePost from './components/SinglePost';

import {useDispatch} from 'react-redux'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.token){
      dispatch(getProfile())
    }
  }, [])
  
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Background>
          <Route exact path="/" component={PostCollection}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/filter" component={Categories}/>
          <Route exact path="/user/:userId" component={Userpanel}/>
          <Route exact path="/create" component={CreatePost}/>
          <Route exact path="/post/:postId" component={SinglePost}/>
        </Background>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
