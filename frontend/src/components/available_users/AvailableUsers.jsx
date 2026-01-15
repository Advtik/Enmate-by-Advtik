import AvailableUser from "../available_user/AvailableUser";
import "./availableusers.scss";
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import makeRequest from "../../axios";

const AvailableUsers = () => {
  const { isLoading, error, data}=useQuery({
    queryKey: ['available'],
    queryFn:async()=>{
        const res=await makeRequest.get("/available")
        return res.data;
    }
  });
  console.log(data);
  return (
    <div className="availableuser">
        {error?"Sorry":
        (isLoading?"Loading":data?.map(available=>(
            <AvailableUser available={available}></AvailableUser>
        )))}
    </div>
  )
}

export default AvailableUsers