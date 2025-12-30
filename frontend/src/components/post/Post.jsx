import "./post.scss"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useState } from 'react'
import { Link, redirect } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'

const Post = ({post}) => {
    console.log(post);
    const [commentOpen,setCommentOpen]=useState(false);

    const { isLoading, error, data}=useQuery({
        queryKey: ['likes',post.postid],
        queryFn:async()=>{
            const res=await makeRequest.get("/likes?postId="+post.postid)
            return res.data; 
        }
    });
    console.log(data);
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
                    <span className="date">{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
            </div>
            <div className="content">
                <p>{post.content}</p>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    { <FavoriteOutlinedIcon style={{color:"red"}}></FavoriteOutlinedIcon>}
                    {data.rows.length} Likes
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
            {commentOpen && <Comments postId={post.postid}></Comments>}
        </div>
    </div>
  )
}

export default Post