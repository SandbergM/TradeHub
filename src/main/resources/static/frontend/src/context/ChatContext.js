import React, { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState({});
  const [chatRooms, setChatRooms] = useState([]);

  const appendMessage = (message) => {
    let newRoom = chatMessages[message.target];
    chatMessages[message.target] = chatMessages[message.target] || [];
    chatMessages[message.target].push(message.content);
    setChatMessages({ ...chatMessages });
    if (newRoom === undefined) {
      fetchChatrooms();
    }
  };

  const fetchChatrooms = async () => {
    let res = await fetch(`/api/v1/chatMessage/myRooms`);
    res = await res.json();
    setChatRooms(res);
  };

  const values = {
    chatMessages,
    appendMessage,
    chatRooms,
    fetchChatrooms,
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider;
