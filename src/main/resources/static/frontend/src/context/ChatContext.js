import React, { createContext, useEffect, useState  } from "react";
import { debounceTimeout } from "../sockets/socket";

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
    debounceTimeout("Hello wörld");

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