import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes=(req,res)=>{
    const q =`SELECT userid FROM enmateschema.likes WHERE postid=$1`;

    db.query(q,[req.query.postId],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows.map(like=>like.userid));
    });
}

export const addLike=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `INSERT INTO enmateschema.likes("userid","postid") VALUES ($1,$2)`;
        const values=[
            userInfo.id,
            req.body.postid
        ]
        db.query(q,values,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json("Like has been added");
        })
    })
}

export const deleteLike=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `DELETE FROM enmateschema.likes WHERE userid=$1 AND postid=$2`;
        const values=[
            userInfo.id,
            req.body.postid
        ]
        db.query(q,values,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json("Disliked");
        })
    })
}

