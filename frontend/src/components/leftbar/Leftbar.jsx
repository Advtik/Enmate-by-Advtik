import React from 'react'
import "./leftbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DarkModeContext } from '../../context/darkModeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import CreatePost from '../../components/createpost/CreatePost'

import { Link } from 'react-router-dom';
const Leftbar = () => {
  const {darkMode,toggle} = React.useContext(DarkModeContext); 
  return (
    <div className='leftbar'>
      <div className='container'>
        <div className='menu'>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className='item'>
              <HomeOutlinedIcon></HomeOutlinedIcon>
                <span>Home</span>
            </div>
          </Link>
          <div className='item'>
            <MessageOutlinedIcon></MessageOutlinedIcon>
            <span>Messages</span>
          </div>
          <div className='item'>
            <CheckCircleOutlinedIcon></CheckCircleOutlinedIcon>
            <span>Available</span>
          </div>
          <div className='item'>
            <GroupOutlinedIcon></GroupOutlinedIcon>
            <span>Teams</span>
          </div>
          <div className='item'>
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
            <span>Notifications</span>
          </div>
          <div className='item'>
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            <span>Bookmark</span>
          </div>
        </div>
        <div className='more'>
          {/* {darkMode?<WbSunnyOutlinedIcon onClick={toggle} className='icon'></WbSunnyOutlinedIcon>:<DarkModeOutlinedIcon onClick={toggle} className='icon'></DarkModeOutlinedIcon>} */}
          <div className='item'>
            <DehazeOutlinedIcon></DehazeOutlinedIcon>
            <span>More</span>
          </div>
          <div className='item'>
            <SmartButtonOutlinedIcon></SmartButtonOutlinedIcon>
            <span>EnMate AI</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Leftbar