import jwt from "jsonwebtoken";
import {db} from "../connect.js";
import moment from "moment/moment.js";

export const getPosts=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const {type}=req.query;
        console.log("type",type);
        let q= `SELECT p.id AS postId,p.desc,p.img,p.userid,p."createdAt",p.title,p.type,p.content,u.id AS userId,u.name,u.profilepic,f.id,f."followerUserId",f."followedUserId" FROM enmateschema.posts p JOIN enmateschema.users u ON (u.id=p.userid) LEFT JOIN enmateschema.follows f ON (p.userid= f."followedUserId" AND f."followerUserId"=$1) WHERE (f."followerUserId" = $1 OR p.userid=$1) `;
        
        let values=[userInfo.id];

        if(type){
            q+=`AND p.type=$2 `;
            values.push(type);
        }

        q+=`ORDER BY p."createdAt" DESC`;
        db.query(q,values,(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            return res.status(200).json(data);
        })
    })
}

export const addPost=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{

        db.query("BEGIN", (err)=>{
            if(err){
                return res.status(500).json(err);
            }
            const q= `INSERT INTO enmateschema.posts("desc",img,userid,"createdAt",title,type,content) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
            const values=[
                req.body.desc,
                req.body.img,
                userInfo.id,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.body.title,
                req.body.type,
                req.body.content
            ]
            db.query(q,values,(err,data)=>{
                if(err){
                    return db.query("ROLLBACK",()=>{
    
                        console.log(err);
                        return res.status(500).json(err); 
                    })
                }
                const update_postcnt=`UPDATE enmateschema.users SET post_count=post_count+1 WHERE id=$1`;
                db.query(update_postcnt,[userInfo.id],(err,data)=>{
                    if(err){
                        return db.query("ROLLBACK",()=>{
        
                            console.log(err);
                            return res.status(500).json(err); 
                        })
                    }
                    db.query("COMMIT",()=>{
    
                        return res.status(200).json("Post count incremented");
                    })
                })
            })
        })
    })
}