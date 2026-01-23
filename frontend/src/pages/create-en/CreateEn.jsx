import React, { useState } from 'react'
import "./create-en.scss"
import Posts from "../../components/posts/Posts"
import CreatePost from '../../components/createpost/CreatePost'
import Home from '../home/Home'
const CreateEn = ({open,setOpen}) => {
  return (
    <div className='CreateEn'>
      {open && <CreatePost open={open} setOpen={setOpen}></CreatePost>}
      <Home></Home>
    </div>
  )
}

export default CreateEn