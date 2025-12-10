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

import CreatePost from '../../components/createpost/CreatePost'

import { Link } from 'react-router-dom';
const Leftbar = () => {
  return (
    <div className='leftbar'>
      <div className='container'>
        <div className='menu'>
          <div className='item'>
            <HomeOutlinedIcon></HomeOutlinedIcon>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <span>Home</span>
            </Link>
          </div>
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