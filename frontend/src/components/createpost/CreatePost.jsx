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
                        <h2>Create a Post</h2>

                        <textarea placeholder="Write something..."></textarea>

                        <div className="actions">
                        <button onClick={() => setopen(false)}>Cancel</button>
                        <button className="submit-btn">Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePost;