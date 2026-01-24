import "./comments.scss"
import React, { useContext } from 'react'
import {AuthContext} from "../../context/authContext"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";
import moment from "moment";
import { useState } from "react";

const Comments = ({postId}) => {
    const [desc,setdesc]=useState("");
    const {currentUser}=useContext(AuthContext)
    const { isLoading, error, data}=useQuery({
        queryKey: ['comments',postId],
        queryFn:async()=>{
            const res=await makeRequest.get("/comments?postId="+postId)
            return res.data; 
        }
    });

  console.log(data?.rows);

  const queryClient=useQueryClient();
    
    const mutation = useMutation(
        {
            mutationFn: (newComment)=>{
                return makeRequest.post("/comments",newComment);
            },
            onSuccess:()=>{
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['comments'] });
                // reset form
                setdesc("");
            },
            onError: (err) => {
                console.error("Comment creation failed:", err);
            }
        }
    )
    const handleClick=async(e)=>{
        e.preventDefault();
        if(!desc.trim()){
            return;
        }
        mutation.mutate({desc,postId});
    }
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser?.profilepic || "/no-avatar.png"} alt="" />
            <input type="text" placeholder="Write a Comment" onChange={(e)=>setdesc(e.target.value)}></input>
            <button onClick={handleClick}>Send</button>
        </div>
        {error?"Sorry" : (isLoading? "Loading" : data?.rows?.map(comment=>(
            <div className="comment">
                <img src={comment.profilepic} alt=""></img>
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        )))}
    </div>
  )
}

export default Comments