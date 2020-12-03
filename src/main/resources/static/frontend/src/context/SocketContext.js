import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";

export const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const SocketContextProvider = (props) => {
  const [ws, setWs] = useState();
  const { appendMessage } = useContext(ChatContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/tradeHubSocket");
    setWs(ws);
  }, []);

  useEffect(() => {
    if (ws == null) return;
    ws.onopen = () => {
      console.log("Socket connection established");
    };

    ws.onclose = () => {
      console.log("Socket connection lost");
    };

    ws.onmessage = (data) => {
      messageHandler(data.data);
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  const sendMessage = (msg) => {
    ws.send(JSON.stringify(msg));
  };

  const messageHandler = (msg) => {
    appendMessage(JSON.parse(msg));
  };

  const values = {
    sendMessage,
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
