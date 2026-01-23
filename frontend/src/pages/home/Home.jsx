import React, { useState } from 'react'
import "./home.scss"
import Posts from "../../components/posts/Posts"
import CreatePost from '../../components/createpost/CreatePost'
const Home = ({open,setOpen}) => {
  return (
    <div className='home'>
      <Posts></Posts>
    </div>
  )
}

export default Home