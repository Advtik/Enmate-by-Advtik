import React, { useContext } from 'react'
import "./profile.scss"
import { AuthContext } from '../../context/authContext'
import Posts from "../../components/posts/posts"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const {currentUser} = useContext(AuthContext);

  const userId=useLocation().pathname.split("/")[2];
  console.log("userId",userId);
  console.log(currentUser.id);

  const { isLoading, error, data}=useQuery({
      queryKey: ['user'],
      queryFn:async()=>{
          const res=await makeRequest.get("/users/find/"+userId)
          return res.data; 
      }
  });
  // console.log("user",data);


  
  const {isLoading:relationshipLoading,data:relationshipdata}=useQuery({
    queryKey: ['relationship'],
    queryFn:async()=>{
      const res=await makeRequest.get("/relationships?followedUserId="+userId)
      return res.data; 
    }
  });

  const queryClient=useQueryClient();
  const mutation = useMutation(
        {
            mutationFn: (following)=>{
                if(following) return makeRequest.delete("/relationships?userId="+userId);
                return makeRequest.post("/relationships?userId="+userId);
            },
            onSuccess:()=>{
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['relationship'] });
            },
            onError: (err) => {
                console.error("follow failed", err);
            }
        }
    )

    const handleFollow=()=>{
        mutation.mutate(relationshipdata?.includes(currentUser.id));
    }
  if(isLoading){
    return <div>Loading profile...</div>;
  }
  
  if(error){
    return <div>Failed to load profile</div>;
  }
  
  if(relationshipLoading){
    return <div>Loading relations</div>
  }
  
  console.log("relation",relationshipdata);
  return (
    <div className="profile">
      <div className="container">

        <div className="top">

          <div className="left">
            <img src={data.profilepic} alt=""/>
          </div>

          <div className="center">
            <div className="username-row">
              <span className="username">{data.username}</span>
              <span className="settings">⚙</span>
            </div>

            <span className="name">{data.name}</span>

            <div className="stats">
              <span><b>{data.post_count}</b> posts</span>
              <span><b>{data.follower_count}</b> followers</span>
            </div>

            <div className="bio">{data.bio}</div>
            <a href={data.website} target="_blank" rel="noreferrer">
              {data.website}
            </a>
          </div>

        </div>

        <div className="buttons">
          {(currentUser.id==userId)?<button>Update</button>:<button onClick={handleFollow}>{(relationshipdata.includes(currentUser.id))?"Unfollow":"Follow"}</button>}
          <button>{(currentUser.id==userId)?"Available":"Message"}</button>
        </div>  

      </div>
      <Posts></Posts>
    </div>
  )
}

export default Profile
