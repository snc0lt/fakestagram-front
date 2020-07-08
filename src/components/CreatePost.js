import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if(imageUrl){
      post()
      console.log(imageUrl)
    }
  },[imageUrl])

  const postDetails = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'fakestagram')
    data.append('cloud_name', 'snc0lt')
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/snc0lt/image/upload', data)
      setImageUrl(res.data.url)
      
    } catch (err) {
      console.log(err)
    }
  
  }

  const post = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token')
    }
    const post = {
      title,
      body,
      photo: imageUrl
    }
    try {
      await axios.post('http://localhost:5000/create',post, {headers: headers} )
    } catch (err) {
      console.log(err)
    }
    setBody('')
    setTitle('')
    setImageUrl('')
  }
  return (
    <div className="mycard">
      <div className='card auth-card input-filed'>
        <h2 style={{ fontFamily: 'Lobster Two' }}>Post</h2>
        <input type="text" name="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" name="body" placeholder='Content' value={body} onChange={(e) => setBody(e.target.value)} />
        <div className="file-field input-field">
          <div className="btn-floating waves-effect waves-light #64b5f6 blue lighten-2">
            <i className="material-icons">file_upload</i>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          onClick={postDetails}
          className="btn waves-effect waves-light #64b5f6 blue lighten-2 submit-btn"
          type="submit">
          Post
        </button>
      </div>
    </div>
  )
}

export default CreatePost