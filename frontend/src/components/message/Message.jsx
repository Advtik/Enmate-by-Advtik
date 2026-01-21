import "./message.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
const Message = ({ message }) => {
  const {currentUser} =useContext(AuthContext);
  const isMine = currentUser.id === message.sender_id;
  return (
    <div className={`messagemain ${isMine ? "mine" : "received"}`}>
      <div className="messagepart">
        <span className="text">{message.text}</span>
        <span className="time">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {isMine && (
        <div className="status">
          <span>{message.seen ? "seen" : "sent"}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
