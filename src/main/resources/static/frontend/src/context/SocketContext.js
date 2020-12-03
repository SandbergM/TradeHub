import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { AuctionContext } from "./AuctionContextProvider"

export const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const SocketContextProvider = (props) => {
  const [ws, setWs] = useState();
  const { appendMessage } = useContext(ChatContext);
  const { setHighestBid } = useContext(AuctionContext);
  

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
      console.log('In onmessage');
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
    let bid = JSON.parse(msg)
    console.log(bid); 
    setHighestBid(bid.highestBid);
    //appendMessage(JSON.parse(msg));
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
