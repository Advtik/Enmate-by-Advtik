import jwt from "jsonwebtoken";
import {db} from "../connect.js";

export const getUser=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `SELECT * FROM enmateschema.users WHERE username=$1`;
    
        db.query(q,[req.params.username],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            const {password,...info}=data.rows[0];
            return res.status(200).json(info);
        })
    })
}

export const updateUser=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{

        const q= `UPDATE enmateschema.users SET name=$1,email=$2,bio=$3,city=$4,site=$5,status=$6,profilepic=$7 WHERE id=$8`;
        const values=[
            req.body.name,
            req.body.email,
            req.body.bio,
            req.body.city,
            req.body.site,
            req.body.status,
            req.body.profilepic,
            userInfo.id
        ]
        db.query(q,values,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json(data.rows[0]);
        })
    })
}