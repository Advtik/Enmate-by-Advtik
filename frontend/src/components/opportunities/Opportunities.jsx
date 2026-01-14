import Post from "../post/Post";
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import makeRequest from "../../axios";
import Opportunity from "../opportunity/Opportunity";
import "./opportunities.scss";


const Opportunities = () => {
  const { isLoading, error, data}=useQuery({
    queryKey: ['opportunities'],
    queryFn:async()=>{
        const res=await makeRequest.get("/posts?type=opportunities")
        return res.data;
    }
  });

  console.log("opportunities",data?.rows);
  return (
    <div className="opportunities">
        {error?"Sorry":
        (isLoading?"Loading":data?.rows?.map(opportunity=>(
            <Opportunity opportunity={opportunity}></Opportunity>
        )))}
    </div>
  )
}

export default Opportunities;


