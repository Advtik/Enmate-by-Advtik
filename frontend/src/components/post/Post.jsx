import "./post.scss"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useState } from 'react'
import { Link, redirect } from "react-router-dom";
import Comments from "../comments/Comments";

const Post = ({post}) => {
    const [commentOpen,setCommentOpen]=useState(false);
  return (
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="userinfo">
                    <img src={post.profilePic} alt=""></img>
                    <div className="details">
                        <Link
                            to={`/profile/${post.userId}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span className="name">{post.name}</span>
                        </Link>
                    <span className="date">1 min ago</span>
                    </div>
                </div>
                <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    { <FavoriteOutlinedIcon style={{color:"red"}}></FavoriteOutlinedIcon>}
                    12 Likes
                </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
                    12 Comments
                </div>
                <div className="item">
                    <ShareOutlinedIcon />
                    Share
                </div>
            </div>
            {commentOpen && <Comments></Comments>}
        </div>
    </div>
  )
}

export default Post