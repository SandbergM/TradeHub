import React, { createContext, useEffect, useState  } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState([])
    
    const fetchMessage = async () => {
      let res = await fetch("");
      try {
        if(res.ok){
        
        }
        else{
         
        }
      } catch {

      }
    };

    useEffect(() => {
      console.log(chatMessages);
    }, [chatMessages]);


  const values = {
    chatMessages,
    setChatMessages,
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider