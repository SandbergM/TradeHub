import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState([]);

  const fetchMessage = async () => {
    let res = await fetch("");
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
    console.log(" ORG : ", chatMessages);
    let tempArr = chatMessages;
    console.log(" TEMP : ", tempArr);
    tempArr.push(message);
    setChatMessages([...chatMessages, message]);
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
