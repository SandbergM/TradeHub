import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState([]);

  const fetchMessage = async () => {
    let res = await fetch("/api/v1/chatMessage");
    res = await res.json()
    console.log(res);
    try {
      if (res.ok) {
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    console.log("USE : ", chatMessages);
  }, [chatMessages]);

  const appendMessage = (message) => {
    console.log(message);
  };

  const values = {
    chatMessages,
    setChatMessages,
    appendMessage,
    fetchMessage
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider;
