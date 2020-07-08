import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

function Signup({ history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const profilePic = 'https://res.cloudinary.com/snc0lt/image/upload/v1592585592/jevktw0bab9rzdhaosyu.png'

  const register = async () => {
    const user = { name, email, password, profilePic }
    await axios.post('http://localhost:5000/signup', user)
    setName('')
    setEmail('')
    setPassword('')
    history.push('/login')
  }
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2 style={{ fontFamily: 'Lobster Two' }}>Fakestagram</h2>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name="name" autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name="email" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          onClick={register}
          className="btn waves-effect waves-light #64b5f6 blue lighten-2 submit-btn"
          type="submit">Signup</button>
      </div>
      <div className="card auth-card">
        <small>
          Already have an account..?
            <Link className='link' to='/login'>Login</Link>
        </small>
      </div>
    </div>
  )
}

export default Signup
