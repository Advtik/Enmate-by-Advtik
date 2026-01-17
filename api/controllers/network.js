import jwt from "jsonwebtoken";
import {db} from "../connect.js"

export const getNetwork=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const followingQuery = `
            SELECT u.*
            FROM enmateschema.users u
            JOIN enmateschema.follows f
            ON u.id = f."followedUserId"
            WHERE f."followerUserId" = $1
        `;

        const followersQuery = `
            SELECT u.*
            FROM enmateschema.users u
            JOIN enmateschema.follows f
            ON u.id = f."followerUserId"
            WHERE f."followedUserId" = $1
        `;
        
        db.query(followingQuery,[userInfo.id],(err,followingdata)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }       
            db.query(followersQuery,[userInfo.id],(err,followersdata)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json(err); 
                }
                const sanitize=(rows) => rows.map(u=>{
                    const { password, ...info } = u;
                    return info;
                });
                console.log(sanitize(followingdata),sanitize(followersdata));
                return res.status(200).json({
                    following:sanitize(followingdata.rows),
                    followers:sanitize(followersdata.rows)
                });

            })
        })
    })
}