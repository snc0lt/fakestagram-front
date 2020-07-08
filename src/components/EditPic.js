import React, { useState, useEffect, useContext} from 'react'
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import axios from 'axios'

const EditPic = () => {
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const { dispatch } = useContext(UserContext)

  const history = useHistory()

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
    const edit = {
      profilePic: imageUrl
    }
    try {
      const {data} = await axios.put('http://localhost:5000/edit',edit, {headers: headers} )
      dispatch({type: 'USER', payload: data})
      history.push('/profile')
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className="mycard">
      <div className='card auth-card input-filed'>
        <h2 style={{ fontFamily: 'Lobster Two' }}>Edit Picture</h2>
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
          Save
        </button>
      </div>
    </div>
  )
}

export default EditPic
