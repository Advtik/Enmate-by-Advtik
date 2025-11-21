import React from 'react'
import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';
// import * as React from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';


const Navbar = ({post}) => {
  const {darkMode,toggle} = React.useContext(DarkModeContext); 
  const {currentUser} = React.useContext(AuthContext); 
  return (
    <div className='navbar'>
        <div className="left">
            <div className='logo'>
                <Link to="/" style={{textDecoration:"none"}}>
                    {darkMode?<img src='https://45sknkzlnr.ucarecd.net/56f5887d-bb59-43ea-84b1-57d805971787/-/preview/1000x1000/'></img>:<img src='https://45sknkzlnr.ucarecd.net/678e2591-0e7d-49ab-ae05-8d488961f2c9/-/preview/1000x1000/'></img>}
                    <span>EnMate</span>
                </Link>
            </div>
            {darkMode?<WbSunnyOutlinedIcon onClick={toggle} className='icon'></WbSunnyOutlinedIcon>:<DarkModeOutlinedIcon onClick={toggle} className='icon'></DarkModeOutlinedIcon>}
            {/* <WbSunnyOutlinedIcon></WbSunnyOutlinedIcon> */}
            <div className='search'>
                <SearchOutlinedIcon></SearchOutlinedIcon>
                <input type='text' placeholder='Search...'></input>
            </div>
        </div>
        <div className="right">
            <NotificationsOutlinedIcon></NotificationsOutlinedIcon>
            <div className='user'>
                <img src={currentUser.profilePic}></img>
                <Link to={`/profile/${currentUser.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <span>{currentUser.name}</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar