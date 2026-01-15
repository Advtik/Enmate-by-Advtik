import jwt from "jsonwebtoken";
import {db} from "../connect.js"

export const getAvailable=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `SELECT u.* FROM enmateschema.users u JOIN enmateschema.follows f ON u.id=f."followedUserId" WHERE f."followerUserId"=$1 AND u.status='available'`;

        
        db.query(q,[userInfo.id],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }       
            const users = data.rows.map(u=>{
                const { password, ...info } = u;
                return info;
            });
            console.log(users);
            return res.status(200).json(users);
        })
    })
}