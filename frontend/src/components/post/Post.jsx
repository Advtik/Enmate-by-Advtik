import "./post.scss"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useContext, useState } from 'react'
import { Link, redirect } from "react-router-dom";
import {AuthContext} from "../../context/authContext"
import Comments from "../comments/Comments";
import moment from "moment";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";

const Post = ({post}) => {
    console.log("post",post);
    const {currentUser}=useContext(AuthContext);
    const [commentOpen,setCommentOpen]=useState(false);

    const { isLoading, error, data}=useQuery({
        queryKey: ['likes',post.postid],
        queryFn:async()=>{
            const res=await makeRequest.get("/likes?postId="+post.postid)
            return res.data; 
        }
    });



    const { isLoading:CommentisLoading, error:Commenterror, data:Commentdata}=useQuery({
        queryKey: ['comments',post.postid],
        queryFn:async()=>{
            const res=await makeRequest.get("/comments?postId="+post.postid)
            return res.data; 
        }
    });
    console.log(Commentdata?.rows);
    const queryClient=useQueryClient();
    
    const mutation = useMutation(
        {
            mutationFn: (liked)=>{
                if(liked) return makeRequest.delete("/likes",{data:{postid:post.postid}});
                return makeRequest.post("/likes",{postid:post.postid});
            },
            onSuccess:()=>{
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['likes'] });
            },
            onError: (err) => {
                console.error("like failed", err);
            }
        }
    )
    console.log(post.userid);

    const handleLike=()=>{
        mutation.mutate(data?.includes(currentUser.id));
    }
  return (
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="userinfo">
                    <img src={post.profilepic} alt=""></img>
                    <div className="details">
                        <Link
                            to={`/profile/${post.username}`}
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
                    { data?.includes(currentUser.id)?
                    <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}></FavoriteOutlinedIcon>:
                    <FavoriteBorderOutlinedIcon onClick={handleLike}></FavoriteBorderOutlinedIcon>}
                    {(data?.length==0)?"No":data?.length} Likes
                </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
                    {(Commentdata?.rows?.length===0)?"No":Commentdata?.rows?.length} Comments
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