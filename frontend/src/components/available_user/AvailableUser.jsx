import React from 'react'
import "./availableuser.scss"
import { useContext, useState } from 'react'
import { Link, redirect } from "react-router-dom";
import {AuthContext} from "../../context/authContext"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import makeRequest from "../../axios";

const AvailableUser = ({available}) => {

  return (
    <div className="availableuser">
            <div className="availableuserinfo">
                <img src={available.profilepic} alt=""></img>
                <div className="details">
                <Link
                    to={`/profile/${available.username}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                <span className="availablename">{available.name}</span>
                <span className='availableusername'>{available.username}</span>
                </Link>

                <span className='availablebio'>{available.bio}</span>
            </div>
            <div className="availableBadge">Available</div>

        </div>
    </div>
  )
}

export default AvailableUser