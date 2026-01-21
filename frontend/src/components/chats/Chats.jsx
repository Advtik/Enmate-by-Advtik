import Chat from "../chat/Chat";
import "./chats.scss";
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import makeRequest from "../../axios";

const Chats = ({setActiveConversation}) => {
  const { isLoading, error, data}=useQuery({
    queryKey: ['chat'],
    queryFn:async()=>{
        const res=await makeRequest.get("/chats")
        return res.data;
    }
  });
  console.log(data);
  return (
    <div className="chats">
        {error ? (
            <div className="chats-state">Something went wrong</div>
        ) : isLoading ? (
            <div className="chats-state">Loading chats...</div>
        ) : (
            data?.map(chat => (
            <Chat key={chat.conversation_id} chat={chat} setActiveConversation={setActiveConversation} />
            ))
        )}
    </div>

  )
}

export default Chats