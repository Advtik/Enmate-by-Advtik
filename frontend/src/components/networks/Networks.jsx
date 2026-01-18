import Follow from "../follow/Follow";
import "./networks.scss";
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import makeRequest from "../../axios";

const Networks=()=>{
  const { isLoading, error, data } = useQuery({
    queryKey: ['network'],
    queryFn: async()=>{
      const res = await makeRequest.get("/network");
      return res.data;
    }
  });

  if(isLoading){
    return <div className="networks">Loading...</div>;
  }

  if(error){
    console.log(error);
    return <div className="networks">Something went wrong</div>;
  }

  console.log("network",data);
  return (
    <div className="networks">
      
      <div className="following">
        <h3>Following</h3>
        {data.following?.length === 0 ? (
          <p>No following users</p>
        ) : (
          data.following?.map(user=>(
            <Follow user={user}/>
          ))
        )}
      </div>

      <div className="followers">
        <h3>Followers</h3>
        {data.followers.length === 0 ? (
          <p>No followers</p>
        ) : (
          data.followers.map(user=>(
            <Follow user={user}/>
          ))
        )}
      </div>

    </div>
  );
};

export default Networks;
