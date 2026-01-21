import "./chat.scss";
import { Link, redirect } from "react-router-dom";


const Chat = ({chat,setActiveConversation}) => {
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