import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css';
import FriendsList from './components/Friendslist';
import LoginForm from './components/Login';
import axiosWithAuth from './axios';

const friendsUrl = 'http://localhost:9000/api/friends'
const loginUrl = 'http://localhost:9000/api/login'



function App() {
  const [friends, setFriends] = useState([])

  const navigate = useNavigate()

  const login = ({username, password}) =>{
    axiosWithAuth().post(loginUrl, {username, password})
    .then(res =>{
      window.localStorage.setItem('token', res.data.token)
      navigate('/friendslist')
    })
    .catch(err=>{
      debugger
    })
  }

  const getFriends = () =>{
    axiosWithAuth().get(friendsUrl)
    .then(res=>{
        setFriends(res.data)
      })
      .catch(err=>{
        debugger
      })

  }

  return (
    <div className="App">
      <h2>Client Auth Project</h2>
      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/friendslist" >Friendlist</NavLink>
        <NavLink to="/">AddFriend</NavLink>
        <NavLink to="/">Logout</NavLink>
       
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="friendslist" element={
          <>
          <FriendsList getFriends={getFriends} friends={friends} />
          </>
        } />
      </Routes>
      
      
    </div>
  );
}

export default App;


// * [ ] Use the [mockup provided](./login_mockup.png) to build out a simple login component.
// * [ ] In `App.js`, add a route to allow this component to be displayed when navigating to `/` or `/login`
// * [ ] When submitting your login form, save the token returned to localStorage and redirect to the FriendsList route.