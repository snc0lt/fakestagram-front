import React, { useContext } from 'react'
import { UserContext } from "../App";
import { Link, useHistory, useLocation } from "react-router-dom";

function Navbar() {

  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const url = useLocation()
  
  const links = () => {
    if (state) {
      return (
        <>
          <li><Link to="/explore">Explore</Link></li>,
          <li><Link to="/create">Post</Link></li>,
          <li><Link to="/profile">Profile</Link></li>,
          {url.pathname !== '/profile'
            ? null
            : <li>
              <i
                style={{cursor: 'pointer', color:'teal'}}
                onClick={() => {
                  localStorage.clear()
                  dispatch({ type: 'CLEAR' })
                  history.push('/login')
                }}
                className="large material-icons">exit_to_app</i>
            </li>
          }

        </>
      )
    } else {
      return (
        <>
          <li><Link to="/signup">Register</Link></li>,
          <li><Link to="login">Login</Link></li>
        </>
      )
    }
  }
  return (
    <div>
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <div className="container">
            <Link to={state ? "/" : "/login"} className="brand-logo left">Fakestagram</Link>
            <ul id="nav-mobile" className="right">
              {links()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar