import React, { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState({});

  const appendMessage = (message) => {
    chatMessages[message.target] = chatMessages[message.target] || [];
    chatMessages[message.target].push(message.content);
    setChatMessages({ ...chatMessages });
    console.log(chatMessages);
  };

  const values = {
    chatMessages,
    setChatMessages,
    appendMessage,
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider;
