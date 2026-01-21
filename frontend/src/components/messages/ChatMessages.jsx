import Message from "../message/Message";
import "./chatmessages.scss";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../axios";
import { useRef } from "react";
import { useEffect } from "react";

const ChatMessages = ({ activeConversation }) => {

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
  });

  //auto scroll to bottom
  useEffect(()=>{
    messagesEndRef?.current?.scrollIntoView({behavior:"smooth"});
  },[data]);


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
      {data.map((message, index) => {
        const currentDate = new Date(message.created_at).toDateString();
        const prevDate =
          index > 0
            ? new Date(data[index - 1].created_at).toDateString()
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
