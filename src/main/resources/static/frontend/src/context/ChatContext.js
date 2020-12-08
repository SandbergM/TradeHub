import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [chatMessages, setChatMessages] = useState(null);
  let debounceID = null;

  const { user } = useContext(UserContext);

  const fetchMessage = () => {
    console.log("1");
    if (debounceID !== null) {
      clearTimeout(debounceID);
      debounceID = null;
    }
    debounceID = setTimeout(async () => {
      let res = await fetch("/api/v1/chatMessage");
      try {
        if (res.ok) {
          res = await res.json();
          setChatMessagesToX(res);
        } else {
        }
      } catch {}
    }, 1000);
  };

  useEffect(() => {
    fetchMessage();
  }, [user]);

  const appendMessage = (message) => {
    console.log("2");
    if (chatMessages !== null) {
      chatMessages[message.target] = chatMessages[message.target] || [];

      chatMessages[message.target].push(message.content);

      setChatMessages({ ...chatMessages });
    }
  };

  const setChatMessagesToX = (messages) => {
    console.log("3");
    setChatMessages(messages);
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
