import React from 'react'
import "./home.scss"
import Posts from "../../components/posts/posts"
import CreatePost from '../../components/createpost/CreatePost'
const Home = () => {
  return (
    <div className='home'>
      <CreatePost></CreatePost>
      <Posts></Posts>
    </div>
  )
}

export default Home