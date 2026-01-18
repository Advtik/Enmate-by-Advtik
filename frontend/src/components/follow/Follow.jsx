import React from 'react'
import "./follow.scss"
import { useContext, useState } from 'react'
import { Link, redirect } from "react-router-dom";
import {AuthContext} from "../../context/authContext"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";

const Follow = ({user}) => {

  return (
    <div className="follow">
            <div className="followinfo">
                <img src={user.profilepic} alt=""></img>
                <div className="followdetails">
                <Link
                    to={`/profile/${user.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                <span className="followname">{user.name}</span>
                <span className='followusername'>{user.username}</span>
                </Link>

                <span className='followbio'>{user.bio}</span>
            </div>
            {/* <div className="followbadge">Available</div> */}

        </div>
    </div>
  )
}

export default Follow