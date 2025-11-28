import express from "express";
import {} from "../controllers/users.js";

const router=express.Router();
router.get("/test", (req,res)=>{
    console.log("This route working");
})

export default router;