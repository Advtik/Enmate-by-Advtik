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
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CreatePost from '../../components/createpost/CreatePost';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { Link } from 'react-router-dom';
const Leftbar = ({open,setOpen}) => {
  const {darkMode,toggle} = React.useContext(DarkModeContext); 
  const handlecreate=()=>{
    return (
      <CreatePost></CreatePost>
    )
  }
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
          <Link to="/messages" style={{textDecoration:"none", color:"inherit" }}>
            <div className='item'>
              <MessageOutlinedIcon></MessageOutlinedIcon>
              <span>Messages</span>
            </div>
          </Link>
          <Link to="/available" style={{textDecoration: "none",color:"inherit"}}>
            <div className='item'>
              <CheckCircleOutlinedIcon></CheckCircleOutlinedIcon>
              <span>Available</span>
            </div>
          </Link>
          <Link to="/network" style={{textDecoration:"none", color:"inherit"}}>
            <div className='item'>
              <GroupOutlinedIcon></GroupOutlinedIcon>
              <span>Network</span>
            </div>
          </Link>
          <Link to="/create" style={{textDecoration:"none", color:"inherit"}}>
            <div className='item' onClick={()=>{setOpen(true)}}>
              <CreateOutlinedIcon></CreateOutlinedIcon>
              <span>Create En</span>
            </div>
          </Link>
          <div className='item'>
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            <span>Bookmark</span>
          </div>
        </div>
        <div className='more'>
          {/* {darkMode?<WbSunnyOutlinedIcon onClick={toggle} className='icon'></WbSunnyOutlinedIcon>:<DarkModeOutlinedIcon onClick={toggle} className='icon'></DarkModeOutlinedIcon>} */}
          <div className='item'>
            <SettingsOutlinedIcon></SettingsOutlinedIcon>
            <span>Settings</span>
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