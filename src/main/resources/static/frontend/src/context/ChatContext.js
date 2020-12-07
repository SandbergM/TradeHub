import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState({});

  const fetchMessage = async () => {
    let res = await fetch("/api/v1/chatMessage");
    try {
      if (res.ok) {
        setChatMessages(await res.json())
        console.log(chatMessages)
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    console.log("USE : ", chatMessages);
  }, [Object.entries(chatMessages).length]);

  // useEffect(() => {
  //   return () => {
  //     console.log("in return");
  //     // setChatMessages(null);
  //   };
  // }, []);

  const appendMessage = (message) => {
    let tempArr;
    if (chatMessages === null || chatMessages[message.target] === undefined) {
      tempArr = [];
      tempArr.push(message.content);
      setChatMessages((chatMessages[message.target] = tempArr));
    } else {
      tempArr = chatMessages[message.target];
      tempArr.push(message.content);
      setChatMessages((chatMessages[message.target] = tempArr));
    }
    console.log(chatMessages);
  };

  const values = {
    chatMessages,
    setChatMessages,
    appendMessage,
    fetchMessage,
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider;
