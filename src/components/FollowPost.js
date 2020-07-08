import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../App";
import axios from 'axios'
import { Link } from 'react-router-dom';


const styles = {
  img: {
    maxHeight: 350,
    maxWidth: 'max-content',
    margin: 'auto',
    objectFit: 'contain'
  },
}

function FollowPost() {
  const [data, setdata] = useState([])
  const { state } = useContext(UserContext)

  useEffect(() => {
    let mounted = true
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    // const ac = new AbortController()
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/followpost', { headers })
      if(mounted) {
      setdata(res.data)
      }
    }
    fetchData()
    return () => mounted = false 
    // return ac.abort()
  }, [data])

  const like = async (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
    const body = {
      postId: id
    }
    try {
      const res = await axios.put('http://localhost:5000/like', body, { headers: headers })
      const newData = data.map(item => {
        if (item._id === res.data._id) {
          return res.data
        } else {
          return item
        }
      })
      setdata(newData)
    } catch (err) {
      console.log(err)
    }
  }

  const unlike = async (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
    const body = {
      postId: id
    }
    try {
      const res = await axios.put('http://localhost:5000/unlike', body, { headers })
      const newData = data.map(item => {
        if (item._id === res.data._id) {
          return res.data
        } else {
          return item
        }
      })
      setdata(newData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleComment = async (text, postId) => {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
    const body = {
      text,
      postId
    }
    console.log(body)
    try {
      const res = await axios.put('http://localhost:5000/comment', body, { headers })
      const newData = data.map(item => {
        if (item._id === res.data._id) {
          return res.data
        } else {
          return item
        }
      })
      setdata(newData)
    } catch (err) {
      console.log(err)
    }
  }

  const deletePost = async (id) => {
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`, {headers})
    } catch (err) {
      console.log(err)
    }
  }

  // let deleteIcon = state ? (<i className="material-icons">delete</i>) : null

  return (
    <div className='container'>
      <div className="row">
        <div className="col s8 offset-s2">
          {
            data.map(item => {
              return (
                <div key={item._id} className="card">
                 <h5><Link to={item.user._id !== state._id ? `/profile/${item.user._id}` : `/profile` }>{item.user.name}</Link>
                 </h5>
                 <div style={{float: 'right', marginTop: '5px', color: '#ff8a80'}}>
                    {item.user._id === state._id && state ? (<i onClick={() => deletePost(item._id)} style={{cursor: 'pointer'}} className="material-icons">delete</i>) : null}
                  </div> 
                  <hr />
                  <div className="card-image">
                    <img style={styles.img}
                      src={item.photo} alt='profile' />
                  </div>
                  <hr />
                  <div className="card-content input-field">
                    <div>
                      <i className="material-icons"></i>
                      {
                        item.likes.includes(state._id)
                          ? <i style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }} onClick={() => unlike(item._id)} className="material-icons">favorite</i>
                          : <i style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => like(item._id)} className="material-icons">favorite_border</i>
                      }
                    </div>
                    <p style={{ marginBottom: '10px' }}>{item.likes.length} likes</p>
                    <p>{item.body}</p>
                    <div>
                    {
                      item.comments.map(comment => {
                        return (
                          <div style={{display: 'flex'}} key={comment._id}>
                            <h6>
                              <span style={{ fontWeight: 'bold' }}>
                                {comment.user.name}
                              </span>
                            </h6>
                            <h6 style={{ marginLeft: '15px' }}>
                              <span >
                                {comment.text}
                              </span>
                            </h6>
                          </div>
                        )
                      })
                    }
                    </div>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      handleComment(e.target[0].value, item._id)
                    }}>
                      <input
                        type="text"
                        name="comment"
                        placeholder='add a comment' />
                    </form>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>

    </div>
  )
}

export default FollowPost