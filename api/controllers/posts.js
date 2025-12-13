import jwt from "jsonwebtoken";
import {db} from "../connect.js";

export const getPosts=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `SELECT p.*,u.id AS userId,u.name,u.profilePic,f.id,f."followerUserId",f."followedUserId" FROM enmateschema.posts p JOIN enmateschema.users u ON (u.id=p.userid) LEFT JOIN enmateschema.follows f ON (p.userid= f."followedUserId" AND f."followerUserId"=$1) WHERE f."followerUserId" = $1 OR p.userid=$1 ORDER BY p."createdAt" DESC`;
    
        db.query(q,[userInfo.id],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json(data);
        })
    })
}