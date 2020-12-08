import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState(null);
  let debounceID = null;

  const fetchMessage = () => {
    if (debounceID !== null) {
      clearTimeout(debounceID);
      debounceID = null;
    }
    debounceID = setTimeout(async () => {
    let res = await fetch("/api/v1/chatMessage");
    try {
      if (res.ok) {
        res = await res.json()
        console.log(res);
        // setChatMessages(res)
        setChatMessagesToX(res)
      } else {
      }
    } catch {}
    console.log(chatMessages)
    }, 250);
  };


  useEffect(() => {
    console.log("USE : ", chatMessages);
  }, [ chatMessages]);

  // useEffect(() => {
  //   return () => {
  //     console.log("in return");
  //     // setChatMessages(null);
  //   };
  // }, []);


  const appendMessage = (message) => {
    if(chatMessages !== null){
      console.log(chatMessages);
      chatMessages[message.target] =
        chatMessages[message.target] ||
        [];
      
      chatMessages[message.target].push(message.content)
      
      setChatMessages({...chatMessages})
      console.log(chatMessages[message.target]);
    }
    console.log(chatMessages);
  };

  const setChatMessagesToX = (messages) => {
    setChatMessages(messages);
  }

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
