import jwt from "jsonwebtoken";
import {db} from "../connect.js";

export const getrelationships=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        const q= `SELECT "followerUserId" FROM enmateschema.follows WHERE "followedUserId"=$1`;
        console.log(req.query.followedUserId);
        db.query(q,[req.query.followedUserId],(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err); 
            }
            console.log(data.rows);
            return res.status(200).json(data.rows.map(relationship=>relationship.followerUserId));
        })
    })
}



export const addrelationships=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{

        db.query("BEGIN", (err)=>{
            if(err){
                return res.status(500).json(err);
            }
            const q= `INSERT INTO enmateschema.follows("followerUserId","followedUserId") VALUES ($1,$2)`;
            const values=[
                userInfo.id,
                req.query.userId
            ]
            db.query(q,values,(err,data)=>{
                if(err){
                    return db.query("ROLLBACK",()=>{
    
                        console.log(err);
                        return res.status(500).json(err); 
                    })
                }
                const update_followcnt=`UPDATE enmateschema.users SET follower_count=follower_count+1 WHERE id=$1`;
                db.query(update_followcnt,[req.query.userId],(err,data)=>{
                    if(err){
                        return db.query("ROLLBACK",()=>{
        
                            console.log(err);
                            return res.status(500).json(err); 
                        })
                    }
                    db.query("COMMIT",()=>{
    
                        return res.status(200).json("follower count incremented and followed");
                    })
                })
            })
        })
    })
}

export const deleterelationships=(req,res)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("Not Logged in!");
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,userInfo)=>{
        db.query("BEGIN", (err)=>{
            if(err){
                return res.status(500).json(err);
            }
            const q= `DELETE FROM enmateschema.follows WHERE "followerUserId"=$1 AND "followedUserId"=$2`;
            const values=[
                userInfo.id,
                req.query.userId
            ]
            db.query(q,values,(err,data)=>{
                if(err){
                    return db.query("ROLLBACK",()=>{
                        console.log(err);
                        return res.status(500).json(err); 
                    })
                }
                const update_followcnt=`UPDATE enmateschema.users SET follower_count=follower_count-1 WHERE id=$1`;
                db.query(update_followcnt,[req.query.userId],(err,data)=>{
                    if(err){
                        return db.query("ROLLBACK",()=>{

                            console.log(err);
                            return res.status(500).json(err); 
                        })
                    }
                    db.query("COMMIT",()=>{
                        return res.status(200).json("follower count decremented and unfollowed");
                    })
                })
            })
        })
    })
}
