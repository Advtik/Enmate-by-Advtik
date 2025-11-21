import "./comments.scss"

import React, { useContext } from 'react'
import {AuthContext} from "../../context/authContext"

const Comments = () => {

    const {currentUser}=useContext(AuthContext)

    const comments=[
        {
            id:1,
            desc:"oye hoye bhai kya badiya baat boli laadle",
            name:"Ansh",
            userId:3,
            profilePic:"https://45sknkzlnr.ucarecd.net/96cb48c1-6d45-4252-a5c3-0e9634e6d6fc/-/preview/1000x666/",
        },
        {
            id:2,
            desc:"oye hoye bhai kya badiya baat boli laadle",
            name:"Ansh",
            userId:3,
            profilePic:"https://45sknkzlnr.ucarecd.net/96cb48c1-6d45-4252-a5c3-0e9634e6d6fc/-/preview/1000x666/",
        }
    ];
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser?.profilePic || "/no-avatar.png"} alt="" />
            <input type="text" placeholder="Write a Comment"></input>
            <button>Send</button>
        </div>
        {comments.map(comment=>(
            <div className="comment">
                <img src={comment.profilePic} alt=""></img>
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">1 hour ago</span>
            </div>
        ))
    }</div>
  )
}

export default Comments