import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from 'axios'

const styles = {
  img: {
    width: 180,
    height: 180,
    borderRadius: 90
  },
  imgContainer: {
    display: 'flex',
    margin: '18px 0px',
    justifyContent: 'space-around'
  },
  imageGalleryContainer: {
    marginTop: 50
  },
  imageGallery: {
    maxWidth: '100%',
    height: 260,
    margin: 1,
    objectFit: 'contain'
  }
}

function Profile() {

  const { state, dispatch } = useContext(UserContext)
  const [profile, setProfile] = useState({})
  const { id } = useParams()

  const fetchData = async () => {
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    const { data } = await axios.get(`http://localhost:5000/user/${id}`, { headers })
    setProfile(data)
  }

  useEffect(() => {   
    fetchData()
  }, [])
  
  const follow = async () => {
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    const body = {
      followId: id
    }
    const { data } = await axios.put(`http://localhost:5000/follow`, body, { headers })
    console.log(data)
    dispatch({
      type: 'UPDATE_USER',
      payload: {followers: data.followers, following: data.following}
    })
    localStorage.setItem('user', JSON.stringify(data))
    // setProfile(data)
    fetchData()
  }

  const unfollow = async () => {
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    const body = {
      followId: id
    }
    const { data } = await axios.put(`http://localhost:5000/unfollow`, body, { headers })
    console.log(data)
    dispatch({
      type: 'UPDATE_USER',
      payload: {followers: data.followers, following: data.following}
    })
    localStorage.setItem('user', JSON.stringify(data))
    // setProfile(data)
    fetchData()
  }
  const { user, posts } = profile
  return user && Object.keys(user).length > 0 && posts ? (
    <div className='container'>
      <div className="row" style={{ borderBottom: '1px solid grey' }}>
        <div className="col s4">
          <div style={styles.imgContainer}>
            <div className="">
              <img style={styles.img}
                src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile" />
            </div>
          </div>
        </div>
        <div className="col s5" style={{ marginTop: '50px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6>{user.name}</h6>
              {
                user.followers.includes(state._id)
                ? <button
                  onClick={unfollow}
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                  type="submit">
                  unfollow
                  </button>
                : <button
                  onClick={follow}
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                  type="submit">
                  follow
                  </button>
              }

            </div>
            <div className='center-align' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <h6>{posts.length} posts</h6>
              <h6>{user.followers.length} followers</h6>
              <h6>{user.following.length} following</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={styles.imageGalleryContainer}>
        <div className="col s12">
          {
            posts.map(item => {
              return (
                <div className="col s4" key={item._id}>
                  <img style={styles.imageGallery}
                    src={item.photo}
                    alt="galery" />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  ) : (
      <h3>Loading..!</h3>
    )
}

export default Profile
