import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes=(req,res)=>{
    const q =`SELECT userid FROM enmateschema.likes WHERE postid=$1`;

    db.query(q,[req.query.postId],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}

