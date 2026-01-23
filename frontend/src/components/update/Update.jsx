import { useState } from "react";
import "./update.scss";
import {
    useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import makeRequest from "../../axios";
import { useLocation } from 'react-router-dom'


const Update=({onClose})=>{
    const userId=useLocation().pathname.split("/")[2];
    const { isLoading, error, data}=useQuery({
        queryKey: ['user'],
        queryFn:async()=>{
            const res=await makeRequest.get("/users/find/"+userId)
            return res.data; 
        }
    });

    const [email,setemail]=useState(data.email);
    const [name,setname]=useState(data.name);
    const [bio,setbio]=useState(data.bio);
    const [city,setcity]=useState(data.city);
    const [site,setsite]=useState(data.site);
    const [status,setstatus]=useState(data.status);
    const [file,setfile]=useState(data.profilepic);

    const upload= async()=>{
        try{
            const formdata=new FormData();
            formdata.append("file",file);
            const res=await makeRequest.post("/upload",formdata);
            return res.data;
        }
        catch(err){
            console.log(err);
        }
    }

    const queryClient=useQueryClient();
    
    const mutation = useMutation(
        {
            mutationFn: (profileUpdate)=>{
                return makeRequest.put("/users",profileUpdate);
            },
            onSuccess:()=>{
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['user'] });
                // reset form
                setname(data.name);
                setemail(data.email);
                setbio(data.bio);
                setcity(data.city);
                setfile(data.profilepic);
                setsite(data.site);
                setstatus(data.status);
                onClose();
            },
            onError: (err) => {
                console.error("Profile updation failed:", err);
            }
        }
    )
    const handleClick=async(e)=>{
        e.preventDefault();
        let imgUrl = data.profilepic;
        if(file instanceof File){
            imgUrl= await upload();
        }
        mutation.mutate({name,email,bio,city,profilepic:imgUrl,site,status});
    }
    if(isLoading){
        return <div>Loading profile...</div>;
    }
    
    if(error){
        return <div>Failed to load profile</div>;
    }

    return(
        <div className="overlay">
            <div className="profileModal">
                
                {/* LEFT SIDE FORM */}
                <div className="formSide">
                <div className="topBar">
                    <h2>Update Profile</h2>
                    <button className="close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleClick} className="profileForm">

                    <div className="row">
                    <span>Name</span>
                    <input placeholder="Your name" maxLength={40} onChange={(e)=>setname(e.target.value)} />
                    </div>

                    <div className="row">
                    <span>Email</span>
                    <input placeholder="Your email" maxLength={45} onChange={(e)=>setemail(e.target.value)} />
                    </div>

                    <div className="row">
                    <span>Bio</span>
                    <input placeholder="Short bio" maxLength={180} onChange={(e)=>setbio(e.target.value)} />
                    </div>

                    <div className="row">
                    <span>City</span>
                    <input placeholder="City" maxLength={40} onChange={(e)=>setcity(e.target.value)} />
                    </div>

                    <div className="row">
                    <span>Profile</span>
                    <input placeholder="Coding profile" maxLength={380} onChange={(e)=>setsite(e.target.value)} />
                    </div>

                    <div className="row">
                    <span>Status</span>
                    <select onChange={(e)=>setstatus(e.target.value)}>
                        <option value="">Select</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                    </div>

                    <div className="buttons">
                    <button type="button" onClick={()=>document.getElementById("fileinput").click()}>
                        Change Photo
                    </button>
                    <button type="submit">Update</button>
                    </div>

                    <input type="file" hidden id="fileinput" accept="image/*" onChange={(e)=>setfile(e.target.files[0])}/>
                </form>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="imageSide">
                {file instanceof File ? (
                        <img src={URL.createObjectURL(file)} />
                    ) : file ? (
                        <img src={file} />
                    ) : (
                        <div className="placeholder">Upload<br/>Photo</div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Update;