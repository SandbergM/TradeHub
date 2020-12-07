import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState(null);

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

  useEffect(() =>{

      return () => {
        console.log("in return");
        setChatMessages(null);
      };
  }, [])

  const appendMessage = (message) => {
    console.log(message);
    let x;
    if(chatMessages === null){
      console.log('in if');
      x = [message]
    }
    else{
       x = chatMessages[message.target];
       console.log(x);
      x.push(message)
    }
    setChatMessages({ ...chatMessages, [message.target]: x }); 
    console.log(chatMessages);
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
