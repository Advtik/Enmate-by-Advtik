import {db} from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//REGISTER
export const register=(req,res)=>{
    //check if user exists
    const q= "SELECT * FROM enmateschema.users WHERE username=$1 OR email=$2"
    const username=req.body.username.toLowerCase();
    db.query(q,[username,req.body.email], (err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        if(data.rows.length){
            return res.status(409).json("User with entered username or email already exists");
        }
        //if doesn't exist create user
          //hash password
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword=bcrypt.hashSync(req.body.password,salt);
    
          const q="INSERT INTO enmateschema.users (username,email,password,name) VALUES ($1,$2,$3,$4)";
          const values=[username,req.body.email,hashedPassword,req.body.name];
          db.query(q,values,(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json("user created successfully");
          })
    })
    console.log("Register working");
    
}
export const login=(req,res)=>{
    const username=req.body.username.toLowerCase();
    const q="SELECT * FROM enmateschema.users WHERE username=$1 OR email=$1";
    db.query(q,[username],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        if(data.rows.length===0){
            return res.status(404).json("User not found!");
        }

        const checkpassword=bcrypt.compareSync(req.body.password,data.rows[0].password);
        if(!checkpassword){
            return res.status(400).json("Wrong Password or Username");
        }

        const token =jwt.sign({id:data.rows[0].id},process.env.JWT_SECRET,{expiresIn: "1d"});

        const {password, ...others}= data.rows[0];
        res
            .cookie("accesstoken",token,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
            })
            .status(200)
            .json(others);
    })
    console.log("login is working");
};


export const logout=(req,res)=>{
    console.log("oye")
    res.clearCookie("accesstoken",{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    });

    return res.status(200).json("Logged out successfully");
};
