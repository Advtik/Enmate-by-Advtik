import express from "express";
const app=express();
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import likeRoute from "./routes/likes.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";

//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin:"http://192.168.1.4:5173",
    credentials:true
}));
app.use(cookieparser());

//file uploading

//file storing on disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

//posting on the upload file route
app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
});
//file upload end

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);


app.listen(8800,()=>{
    console.log("Api working");
});
