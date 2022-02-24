import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css';
import FriendsList from './components/Friendslist';
import LoginForm from './components/Login';
import axiosWithAuth from './axios';
import AddFriend from './components/addFriends';

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

  const logout = () => {
    window.localStorage.removeItem('token')
    navigate('/')
  }

  const getFriends = () =>{
    axiosWithAuth().get(friendsUrl)
    .then(res=>{
        setFriends(res.data)
      })
      .catch(err=>{
        navigate('/')
      })

  }
  const appFriend = ({ username, age, email }) => {
    axiosWithAuth().post(friendsUrl, { username, email, age})
    .then(res => {
      setFriends(...friends, res.data)
    })
    .catch(err => {
      navigate('/')
    })
  }

  return (
    <div className="App">
      <h2>Client Auth Project</h2>
      <button id="logout" onClick={logout}>Logout</button>
      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/friendslist" >Friendlist</NavLink>
        <NavLink to="/friends/add">AddFriend</NavLink>
       
       
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="friendslist" element={ <FriendsList getFriends={getFriends} friends={friends} /> } />
        <Route path="friends/add" element={ <AddFriend addFriend={appFriend} friends={friends}/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;


// * [ ] Use the [mockup provided](./login_mockup.png) to build out a simple login component.
// * [ ] In `App.js`, add a route to allow this component to be displayed when navigating to `/` or `/login`
// * [ ] When submitting your login form, save the token returned to localStorage and redirect to the FriendsList route.