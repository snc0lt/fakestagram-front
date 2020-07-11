import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../App";
import axios from 'axios'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 450,
    objectFit: 'cover',
  },
}));

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
    margin: 1
  }
}

function Profile() {

  const { state } = useContext(UserContext)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // const ac = new AbortController()
    let mounted = true
    const headers = {
      'auth-token': localStorage.getItem('auth-token')
    }
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/myposts', { headers: headers })
      if (mounted) {
        setPosts(data)
      }
    }
    fetchData()
    return () => mounted = false
    // return ac.abort()
  }, [])
  const classes = useStyles();

  return (
    <div className='container'>
      <div className="row" style={{ borderBottom: '1px solid grey' }}>
        <div className="col s4">
          <div style={styles.imgContainer}>
            <div className="">
              <img style={styles.img}
                src={state ? state.profilePic : 'https://res.cloudinary.com/snc0lt/image/upload/v1592585592/jevktw0bab9rzdhaosyu.png'} alt="profile" />
            </div>
          </div>
        </div>
        <div className="col s5" style={{ marginTop: '50px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>{state ? state.name : 'loading'}</h5>
              <Link to='/edit'>
                <div className="btn waves-effect waves-light #fafafa grey lighten-5">
                  <span style={{ color: '#00bcd4' }}>Edit</span>
                </div>
              </Link>
            </div>
            <div className='center-align' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6>{posts.length} posts</h6>
              <h6>{state && state.followers.length} followers</h6>
              <h6>{state && state.following.length} following</h6>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row" style={styles.imageGalleryContainer}>
        <div className="col s12">
          {
            posts.map(post => {
              return (
                <div className="col s4" key={post._id}>
                  <img style={styles.imageGallery}
                    src={post.photo}
                    alt="galery" />
                </div>
              )
            })
          }
        </div>
      </div> */}
      <div className={classes.root}>
        <GridList cellHeight={250} className={classes.gridList} cols={3}>
          {posts.map((post) => (
            <GridListTile key={post._id} cols={1}>
              <img src={post.photo} alt='photo' />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  )
}

export default Profile
