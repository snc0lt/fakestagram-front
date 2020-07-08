import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Login({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { dispatch } = useContext(UserContext)

  const login = async () => {
    const user = { email, password }
    const res = await axios.post('http://localhost:5000/signin', user)
    localStorage.setItem('auth-token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    dispatch({type: 'USER', payload: res.data.user })
    setEmail('')
    setPassword('')
    history.push('/')
  }
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2 style={{ fontFamily: 'Lobster Two' }}>Fakestagram</h2>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name="email" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          onClick={login}
          className="btn waves-effect waves-light #64b5f6 blue lighten-2 submit-btn"
          type="submit">
          Login
          </button>
      </div>
      <div className="card auth-card">
        <small>
          Don't have an account..?
            <Link className='link' to='/signup'>Register</Link>
        </small>
      </div>
    </div>
  )
}

export default Login
