import { useState } from "react";
import "./CreatePost.scss";


const CreatePost=()=>{
    const [open,setopen]=useState(false);
    return(
        <div className="create">
            <div className="inner">
                <span>Wanna post something? or finding person to team up with?</span>
                <button className="create_button" onClick={()=>setopen(true)}>Create En</button>
            </div>

            {open && (
                <div className="overlay">
                    <div className="modal">
                        <div className="top">
                        <h2>Create En</h2>
                        <button onClick={() => setopen(false)} className="close">&times;</button> 
                        </div> 

                        <form className="createform">
                            <div>
                                <span>Title  </span>
                                <input placeholder="Title" maxLength={35}></input>
                            </div>
                            <br></br>
                            <div>
                                <span>Type  </span>
                                <select id="type" name="type">
                                    <option value="">Select...</option>
                                    <option value="post">Post</option>
                                    <option value="opportunities">Opportunities</option>
                                </select>
                            </div>
                            <br></br>
                            <div>
                                <span>Description  </span>
                                <input placeholder="Description" maxLength={100}></input>
                            </div>
                            <br></br>
                            <div>
                                <span>Content</span>
                                <textarea placeholder="Whats on your mind"></textarea>
                            </div>
                        </form>

                        <div className="actions">
                            <button>Attach Image</button>
                        <button className="submit-btn">Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePost;