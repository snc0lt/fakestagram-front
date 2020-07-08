import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../App";
import axios from 'axios'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    marginTop: 50
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
    objectFit: "contain"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));


const styles = {
  img: {
    maxHeight: 350,
    maxWidth: 'max-content',
    margin: 'auto',
    objectFit: 'contain'
  },
}
function Home() {
  const [data, setdata] = useState([])
  const { state } = useContext(UserContext)

  useEffect(() => {
    let mounted = true
    // const ac = new AbortController()
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/post')
      if (mounted) {
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
      await axios.delete(`http://localhost:5000/delete/${id}`, { headers })
    } catch (err) {
      console.log(err)
    }
  }

  // let deleteIcon = state ? (<i className="material-icons">delete</i>) : null

  // return (
  //   <div className='container'>
  //     <div className="row">
  //       <div className="col s8 offset-s2">
  //         {
  //           data.map(item => {
  //             return (
  //               <div key={item._id} className="card">
  //                 <h5><Link to={item.user._id !== state._id ? `/profile/${item.user._id}` : `/profile`}>{item.user.name}</Link>
  //                   <div style={{ float: 'right', marginTop: '5px', color: '#ff8a80' }}>
  //                     {item.user._id === state._id && state ? (<i onClick={() => deletePost(item._id)} style={{ cursor: 'pointer' }} className="material-icons">delete</i>) : null}
  //                   </div>
  //                 </h5>
  //                 <hr />
  //                 <div className="card-image">
  //                   <img style={styles.img}
  //                     src={item.photo} alt='profile' />
  //                 </div>
  //                 <hr />
  //                 <div className="card-content input-field">
  //                   <div>
  //                     <i className="material-icons"></i>
  //                     {
  //                       item.likes.includes(state._id)
  //                         ? <i style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }} onClick={() => unlike(item._id)} className="material-icons">favorite</i>
  //                         : <i style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => like(item._id)} className="material-icons">favorite_border</i>
  //                     }
  //                   </div>
  //                   <p style={{ marginBottom: '10px' }}>{item.likes.length} likes</p>
  //                   <p>{item.body}</p>
  //                   <div>
  //                     {
  //                       item.comments.map(comment => {
  //                         return (
  //                           <div style={{ display: 'flex' }} key={comment._id}>
  //                             <h6>
  //                               <span style={{ fontWeight: 'bold' }}>
  //                                 {comment.user.name}
  //                               </span>
  //                             </h6>
  //                             <h6 style={{ marginLeft: '15px' }}>
  //                               <span >
  //                                 {comment.text}
  //                               </span>
  //                             </h6>
  //                           </div>
  //                         )
  //                       })
  //                     }
  //                   </div>
  //                   <form onSubmit={(e) => {
  //                     e.preventDefault()
  //                     handleComment(e.target[0].value, item._id)
  //                   }}>
  //                     <input
  //                       type="text"
  //                       name="comment"
  //                       placeholder='add a comment' />
  //                   </form>
  //                 </div>
  //               </div>
  //             )
  //           })
  //         }

  //       </div>
  //     </div>

  //   </div>
  // )
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center">
      <Grid item lg md />
      <Grid item lg md sm={10} xs={10}>
        <div>
          {data.map(item => {
            return (
              <Card className={classes.root} key={item._id} >
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                     {item.user.profilePic}
                    </Avatar>
                  }
                  action={<div style={{ color: '#ff8a80' }}>
                    {item.user._id === state._id && state ? (<i onClick={() => deletePost(item._id)} style={{ cursor: 'pointer' }} className="material-icons">delete</i>) : null}
                  </div>}
                  title={<Link to={item.user._id !== state._id ? `/profile/${item.user._id}` : `/profile`}>{item.user.name}</Link>}
                />
                <CardMedia
                  className={classes.media}
                  image={item.photo}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.body}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {
                    item.likes.includes(state._id)
                      ? <IconButton aria-label="add to favorites" onClick={() => unlike(item._id)} ><FavoriteIcon style={{ color: 'red' }} /></IconButton>
                      : <IconButton onClick={() => like(item._id)} ><FavoriteBorderIcon /></IconButton>
                  }
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleComment(e.target[0].value, item._id)
                  }}>
                    <input
                      type="text"
                      name="comment"
                      placeholder='add a comment' />
                  </form>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    {
                      item.comments.map(comment => {
                        return (
                          <>
                            <Typography style={{fontWeight: 'bold'}} variant="subtitle2" gutterBottom>
                              {comment.user.name}
                              <Typography style={{marginLeft: '10px'}} variant="caption" gutterBottom>
                                {comment.text}
                              </Typography>
                            </Typography>
                          </>
                        )
                      })
                    }
                  </CardContent>
                </Collapse>
              </Card>
            )
          })}
        </div>
      </Grid>
      <Grid item lg md />
    </Grid>
  );
}

export default Home
