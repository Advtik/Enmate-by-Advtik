import React, { useContext,useState } from 'react'
import "./profile.scss"
import { AuthContext } from '../../context/authContext'
import Posts from "../../components/posts/Posts"
import Update from "../../components/update/Update"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import CreatePost from '../../components/createpost/CreatePost'

const Profile = ({open,setOpen}) => {
  const {currentUser,setCurrentUser} = useContext(AuthContext);
  const[showUpdate,setshowUpdate]=useState(false);

  const {username}=useParams();
  // console.log("userId",userId);
  console.log(currentUser);

  const handleMessaging=()=>{
    navigate("/messages?userId="+data.id);
  }

  const { isLoading, error, data}=useQuery({
      queryKey: ['user',username],
      queryFn:async()=>{
          const res=await makeRequest.get("/users/find/"+username)
          return res.data; 
      }
  });
  // console.log("user",data);

  // let userId=data.id;
  const navigate=useNavigate();
  const logout=async()=>{
    console.log("oye");
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);
    navigate("/login");
    localStorage.removeItem("user");
  }
  
  const {isLoading:relationshipLoading,data:relationshipdata}=useQuery({
    queryKey: ['relationship'],
    queryFn:async()=>{
      const res=await makeRequest.get("/relationships?followedUserId="+data.id)
      return res.data; 
    }
  });

  const queryClient=useQueryClient();
  const mutation = useMutation(
        {
            mutationFn: (following)=>{
                if(following) return makeRequest.delete("/relationships?userId="+data.id);
                return makeRequest.post("/relationships?userId="+data.id);
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
    return <div className='relationshipLoading'>Loading profile...</div>;
  }
  
  if(error){
    return <div>Failed to load profile</div>;
  }
  
  if(relationshipLoading){
    return <div className='relationshipLoading'>Loading Profile..</div>
  }
  
  console.log("relation",relationshipdata);


  return (
    <div className="profile">
      {open && <CreatePost open={open} setOpen={setOpen}></CreatePost>}
      <div className="container">

        <div className="top">

          <div className="left">
            <img src={data.profilepic} alt=""/>
          </div>

          <div className="center">
            <div className="username-row">
              <span className="username">{data.username}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: data.status === "available" ? "#22c55e" : "#9ca3af",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginLeft: "6px"
                }}
              >
                ✓
              </span>


            </div>

            <span className="name">{data.name}</span>

            <div className="stats">
              <span><b>{data.post_count}</b> posts</span>
              <span><b>{data.follower_count}</b> followers</span>
            </div>

            <div className="bio">{data.bio}</div>
            <a href={data.site} target="_blank" rel="noreferrer">
              {data.site}
            </a>
          </div> 

        </div>

        <div className="buttons">
          {(currentUser.id==data.id)?<button onClick={()=>{setshowUpdate(true)}}>Update</button>:<button onClick={handleFollow}>{(relationshipdata.includes(currentUser.id))?"Unfollow":"Follow"}</button>}
          {(currentUser.id==data.id)?<button onClick={logout}>Logout</button>:<button onClick={handleMessaging}>Message</button>}
        </div>  

      </div>
      {showUpdate && <Update onClose={()=>{setshowUpdate(false)}}></Update>}
      <Posts></Posts>
    </div>
  )
}

export default Profile
