import jwt from "jsonwebtoken";
import {db} from "../connect.js";

export const getUser=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `SELECT * FROM enmateschema.users WHERE id=$1`;
    
        db.query(q,[req.params.userId],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            const {password,...info}=data.rows[0];
            return res.status(200).json(info);
        })
    })
}