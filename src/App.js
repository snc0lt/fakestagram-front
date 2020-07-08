import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import EditPic from './components/EditPic'
import { userReducer } from "./reducers/userReducer";
import FollowPost from './components/FollowPost';


export const UserContext = createContext()

const Routing = () => {
  const { dispatch } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'USER', payload: user })
    } else {
      history.push('/login')
    }
  },[])
  return (
    < Switch >
      <Route exact path='/' component={FollowPost} />
      <Route exact path='/explore' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/profile/:id' component={UserProfile} />
      <Route exact path='/create' component={CreatePost} />
      <Route exact path='/edit' component={EditPic} />
    </Switch >
  )
}

function App() {
  const [state, dispatch] = useReducer(userReducer)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing/>
      </UserContext.Provider>
    </>
  );
}

export default App;
