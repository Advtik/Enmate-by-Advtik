import { Link } from "react-router-dom";
import "./chatwindow.scss";
import ChatMessages from "../messages/ChatMessages";
import { useContext, useState, useEffect } from "react";
import makeRequest from "../../axios";
import { socket } from "../../socket";
import { AuthContext } from "../../context/authContext";

const ChatWindow = ({ activeConversation }) => {
  const {currentUser} =useContext(AuthContext);
  if (!activeConversation) {
    return (
      <div className="rightchat empty">
        <span>Select a chat to start messaging</span>
      </div>
    );
  }
  const [text,setText]=useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const handleSend=async()=>{
    if(!text.trim()){
      return;
    }

    const newMessage = {
      sender_id: currentUser.id,
      text,
      conversation_id: activeConversation.conversation_id,
      created_at: new Date(),
      seen: false
    };

    // 🔥 INSTANT UI UPDATE
    setChatMessages(prev => [...prev, newMessage]);
    
    await makeRequest.post("/message",{
      conversationId:activeConversation.conversation_id,
      text
    });

    socket.emit("sendMessage",{
      conversationId: activeConversation.conversation_id,
      receiverId: activeConversation.user_id,
      senderId: currentUser.id,
      text
    })
    setText("");
  }


  return (
    <div className="rightchat">
      {/* HEADER */}
      <div className="chatHeader">
        <Link to={`/profile/${activeConversation.user_id}`} style={{textDecoration:"none"}}> 
        <div className="chatHeaderLeft">
          <img src={activeConversation.profilepic} alt="profile" />
          <div className="chatHeaderInfo">
            <span className="username">{activeConversation.name}</span>
            <span className="status">{activeConversation.username}</span>
          </div>
        </div>
        </Link>
      </div>

      {/* MESSAGES AREA */}
      <div className="chatMessages">
        {/* messages will be mapped here later */}
        <ChatMessages activeConversation={activeConversation} chatMessages={chatMessages} setChatMessages={setChatMessages}></ChatMessages>
      </div>

      {/* INPUT AREA */}
      <div className="chatInput">
        <textarea
          className="messageInput"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter" && !e.shiftKey){
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
