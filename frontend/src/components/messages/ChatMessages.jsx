import Message from "../message/Message";
import "./chatmessages.scss";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../axios";
import { socket } from "../../socket";
import { useRef, useState } from "react";
import { useEffect } from "react";

const ChatMessages = ({ activeConversation, chatMessages,setChatMessages }) => {

  const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();

    const isToday =
      date.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday =
      date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const messagesEndRef=useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", activeConversation?.conversation_id],
    queryFn: async () => {
      const res = await makeRequest.get(
        "/message/" + activeConversation.conversation_id
      );
      return res.data;
    },
    enabled: !!activeConversation, // 🔥 VERY IMPORTANT
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  
  useEffect(() => {
    const handler = (message) => {
      setChatMessages(prev => {
        if (message.conversation_id !== activeConversation?.conversation_id) {
          return prev;
        }
        return [...prev, message];
      });
    };
    
    socket.on("receiveMessage", handler);
    
    return () => socket.off("receiveMessage", handler);
  }, []);
  
  useEffect(()=>{
    if(data){
      setChatMessages(data);
    }
  },[data]);
  
  useEffect(()=>{
    messagesEndRef?.current?.scrollIntoView({behavior:"smooth"});
  },[chatMessages]);
  
  if (!activeConversation) {
    return <div className="messages empty">Select a chat</div>;
  }
  
  if (isLoading) {
    return <div className="messages loading">Loading messages...</div>;
  }
  
  if (error) {
    return <div className="messages error">Something went wrong</div>;
  }
  
  return (
    <div className="chatmessages">
      {chatMessages.map((message, index) => {
        const currentDate = new Date(message.created_at).toDateString();
        const prevDate =
          index > 0
            ? new Date(chatMessages[index - 1].created_at).toDateString()
            : null;

        const showDateSeparator = currentDate !== prevDate;

        return (
          <div key={message.id}>
            {showDateSeparator && (
              <div className="date-separator">
                {formatDateLabel(message.created_at)}
              </div>
            )}

            <Message message={message} />
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
