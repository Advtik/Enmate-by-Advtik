import Express from "express";
const app=Express();
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import likeRoute from "./routes/likes.js";
import authRoute from "./routes/auth.js";

app.use("/api/",userRoute);

app.listen(8800,()=>{
    console.log("Api working");
});
