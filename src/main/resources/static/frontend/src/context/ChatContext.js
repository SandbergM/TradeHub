import React, { createContext, useEffect, useState  } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
    
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
      
    }, []);


  const values = {
    
  };

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
export default ChatContextProvider