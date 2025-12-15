import Post from "../post/Post";
import "./posts.scss";
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import makeRequest from "../../axios";

const Posts = () => {
  const { isLoading, error, data}=useQuery({
    queryKey: ['posts'],
    queryFn:async()=>{
        const res=await makeRequest.get("/posts")
        return res.data;
    }
  });
  console.log(data?.rows);
  return (
    <div className="posts">
        {error?"Sorry":
        (isLoading?"Loading":data?.rows?.map(post=>(
            <Post post={post} key={post.postId}></Post>
        )))}
    </div>
  )
}

export default Posts