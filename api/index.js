
import express from "express";
const app=express();
import { Server, Socket } from "socket.io";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import likeRoute from "./routes/likes.js";
import authRoute from "./routes/auth.js";
import relationshipRoute from "./routes/relationships.js"
import availableRoute from "./routes/available.js"
import networkRoute from "./routes/network.js"
import conversationRoute from "./routes/conversation.js"
import messageRoute from "./routes/message.js"
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import {uploadoncloud} from "./utils/cloudinary.js"
import chatsRoute from "./routes/chats.js"
//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`,
    credentials:true
}));
app.use(cookieparser());

//file uploading

//file storing on disk storage
const storage = multer.memoryStorage();
const upload = multer({storage })

//posting on the upload file route
app.post("/api/upload",upload.single("file"),async(req,res)=>{
    const file=req.file;

    if (!file) {
      return res.status(400).json("No file uploaded");
    }
    console.log(file.path);
    const cloudresponse=await uploadoncloud(file.buffer);

    if (!cloudresponse) {
      return res.status(500).json("Cloud upload failed");
    }
    res.status(200).json(cloudresponse.secure_url);
});
//file upload end
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);
app.use("/api/relationships",relationshipRoute);
app.use("/api/available",availableRoute);
app.use("/api/network",networkRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/message",messageRoute);
app.use("/api/chats",chatsRoute);

const PORT=process.env.PORT||8800;
const server=app.listen(PORT,()=>{
    console.log("Api working");
});

const io=new Server(server, {
  cors:{
    origin:`${process.env.FRONTEND_URL}`,
    credentials:true
  }
})

const onlineUsers=new Map();
io.on("connection",(socket)=>{
  console.log("socket connected: ",socket.id);

  socket.on("addUser",(userId)=>{
    onlineUsers.set(userId,socket.id);
    console.log("online users: ",onlineUsers);
  })

  socket.on("sendMessage",({receiverId,senderId,text,conversationId})=>{
    const receiverSocketId=onlineUsers.get(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("receiveMessage",{
        sender_id:senderId,
        text,
        conversation_id: conversationId,
        created_at:new Date(),
        seen: false
      });
    }
    // const senderSocketId=onlineUsers.get(senderId);
    // io.to(senderSocketId).emit("receiveMessage",{
    //     sender_id:senderId,
    //     text,
    //     conversation_id: conversationId,
    //     created_at:new Date(),
    //     seen: false
    //   });
    console.log("sending to", receiverSocketId);
  })

  socket.on("disconnect",()=>{
    console.log("socket disconnected: ",socket.id);
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});
