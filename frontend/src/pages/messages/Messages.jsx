import { Link } from "react-router-dom";
import "./messages.scss";
import Chats from "../../components/chats/Chats";
import ChatWindow from "../../components/chatwindow/ChatWindow";
import { useState } from "react";

const Messages = () => {
  const [activeConversation,setActiveConversation]= useState(null);
  console.log("convo",activeConversation);
  
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
