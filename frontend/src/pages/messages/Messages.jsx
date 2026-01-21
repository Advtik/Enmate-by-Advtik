import { Link, useSearchParams } from "react-router-dom";
import "./messages.scss";
import Chats from "../../components/chats/Chats";
import ChatWindow from "../../components/chatwindow/ChatWindow";
import { useState,useEffect } from "react";
import makeRequest from "../../axios";
const Messages = () => {
  const [activeConversation,setActiveConversation]= useState(null);
  console.log("convo",activeConversation);

  const [searchParams]=useSearchParams();
  const profileUserId=searchParams.get("userId");
  console.log(profileUserId);

  useEffect(() => {
    if (!profileUserId) return;

    const getConversation = async () => {
      try{
        console.log("hello");
        const res = await makeRequest.get("/conversation/"+profileUserId);
        console.log("res",res.data.id);
        setActiveConversation(res.data);
      }
      catch(err){
        console.log("conversation error", err.response?.data||err.message);
      }
    };
    getConversation();

  }, [profileUserId]);

  console.log("activeConversation",activeConversation);

  
  return (
    <div className="messages">
      {/* LEFT: chat list */}
      <div className="leftchat">
        <div className="leftchat-header">
          <h3>Chats</h3>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="backtohome">← Home</button>
          </Link>
        </div>
        <div className="chats">
            <Chats setActiveConversation={setActiveConversation}></Chats> 
        </div>
      </div>

      {/* RIGHT: chat window */}
      <div className="rightchat">
            <ChatWindow activeConversation={activeConversation}></ChatWindow>
      </div>

    </div>
  );
};

export default Messages;
