import React, { useContext } from 'react'
import "./profile.scss"
import { AuthContext } from '../../context/authContext'
import Posts from "../../components/posts/posts"

const Profile = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="container">

        <div className="top">

          <div className="left">
            <img src={currentUser.profilePic} alt="" />
          </div>

          <div className="center">
            <div className="username-row">
              <span className="username">{currentUser.username}</span>
              <span className="settings">⚙</span>
            </div>

            <span className="name">{currentUser.name}</span>

            <div className="stats">
              <span><b>{currentUser.numberofposts}</b> posts</span>
              <span><b>{currentUser.followers}</b> followers</span>
            </div>

            <div className="bio">{currentUser.bio}</div>

            <a href={currentUser.link} target="_blank" rel="noreferrer">
              {currentUser.link}
            </a>
          </div>

        </div>

        <div className="buttons">
          <button>Follow</button>
          <button>Message</button>
        </div>

      </div>
      <Posts></Posts>
    </div>
  )
}

export default Profile
