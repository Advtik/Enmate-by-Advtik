import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComment=(req,res)=>{
    const q =`SELECT c.id AS commentId,c.desc,c."userId",c."createdAt",c."postId",u.id AS userId,u.name,u.profilePic FROM enmateschema.comments c JOIN enmateschema.users u ON (u.id=c."userId") WHERE c."postId"=$1 ORDER BY c."createdAt" DESC`;

    db.query(q,[req.query.postId],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    })
}

export const addComment=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `INSERT INTO enmateschema.comments("desc","userId","createdAt","postId") VALUES ($1,$2,$3,$4)`;
        const values=[
            req.body.desc,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.postId
        ]
        db.query(q,values,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json("Comment has been created");
        })
    })
}