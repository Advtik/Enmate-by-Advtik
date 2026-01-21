import "./chat.scss";
import { Link, redirect } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Chat = ({chat,setActiveConversation}) => {
  const [searchParams]=useSearchParams();
  const profileUserId=searchParams.get("userId");

  useEffect(() => {
    if (!profileUserId) return;
    setActiveConversation(chat)
  }, [profileUserId]);
  
  return (
    <div className="chatmain" onClick={()=>setActiveConversation(chat)}>
            <div className="chatuserinfo">
                <img src={chat.profilepic} alt=""></img>
                <div className="chatuserdetails">
                <span className="chatname">{chat.name}</span>
                <span className='chatusername'>{chat.username}</span>

                <span className='chatuserbio'>{chat.bio}</span>
            </div>
        </div>
    </div>
  )
}

export default Chat;