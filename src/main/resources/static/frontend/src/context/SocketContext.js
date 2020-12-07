import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { AuctionContext } from "./AuctionContextProvider";
import { UserContext } from "./UserContext";

export const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const SocketContextProvider = (props) => {
  const [ws, setWs] = useState();
  const { appendMessage } = useContext(ChatContext);
  const { setHighestBid } = useContext(AuctionContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/tradeHubSocket");
    setWs(ws);
  }, [user]);

  useEffect(() => {
    if (ws == null) return;
    ws.onopen = () => {
      if (user !== null) {
        ws.send(
          JSON.stringify({
            action: "connection",
            payload: { id: user.id },
          })
        );
      }
      console.log("Connected to socket");
    };

    ws.onclose = () => {
      ws.close();
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
    msg = JSON.parse(msg);
    switch (msg.action) {
      case "bid":
        setHighestBid(msg.content.bid);
        break;
      case "chat-message":
        appendMessage(msg);
        break;
    }
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
