import { useState } from "react";
import "./CreatePost.scss";
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import makeRequest from "../../axios";

const CreatePost=({open,setOpen})=>{
    const [desc,setdesc]=useState("");
    const [title,settitle]=useState("");
    const [type,settype]=useState("");
    const [content,setcontent]=useState("");
    const [file,setfile]=useState(null);

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
            mutationFn: (newPost)=>{
                return makeRequest.post("/posts",newPost);
            },
            onSuccess:()=>{
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                // reset form
                settitle("");
                setdesc("");
                settype("");
                setcontent("");
                setfile(null);
            },
            onError: (err) => {
                console.error("Post creation failed:", err);
            }
        }
    )
    const handleClick=async(e)=>{
        e.preventDefault();
        if(!content.trim() || !title.trim() || !desc.trim()){
            return;
        }
        const imgUrl= await upload();
        mutation.mutate({title,desc,type,content,img:imgUrl});
        
    }

    return(
        <div className="create">

            {( 
                <div className="overlay">
                    <div className="modal">
                        <div className="top">
                        <h2>Create En</h2>
                        <button onClick={() => setOpen(false)} className="close">&times;</button> 
                        </div> 

                        <form className="createform" onSubmit={handleClick}>
                            <div>
                                <span>Title  </span>
                                <input placeholder="Title" maxLength={35} name="title" required onChange={(e)=>settitle(e.target.value)}></input>
                            </div>
                            <br></br>
                            <div>
                                <span>Type  </span>
                                <select id="type" name="type" required onChange={(e)=>settype(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="post">Post</option>
                                    <option value="opportunities">Opportunities</option>
                                </select>   
                            </div>
                            <br></br>
                            <div>
                                <span>Description  </span>
                                <input placeholder="Description" name="desc" maxLength={100} required onChange={(e)=>setdesc(e.target.value)}></input>
                            </div>
                            <br></br>
                            <div>
                                <span>Content</span> 
                                <textarea placeholder="Whats on your mind" name="content" required onChange={(e)=>setcontent(e.target.value)}></textarea>
                            </div>
                            <div className="actions">
                                <input type="file" accept="image/*" hidden id="fileinput" onChange={(e)=>{setfile(e.target.files[0])}}>
                                </input>
                                <div className="attach">
                                    <button type="button" onClick={()=>document.getElementById("fileinput").click()}>Attach Image</button>
                                    {file && <img src={URL.createObjectURL(file)} className="image"></img>}
                                </div>
                                <button type="submit" className="submit-btn" >Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePost;