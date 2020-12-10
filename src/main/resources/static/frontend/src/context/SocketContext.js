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

  const sendMessage = async (msg) => {
    if (ws.readyState !== 1) {
      try {
        await socketReconnect(ws);
        ws.send(JSON.stringify(msg));
      } catch (e) {
        console.log(e);
      }
    } else {
      ws.send(JSON.stringify(msg));
    }
  };

  const socketReconnect = (socket) => {
    return new Promise((resolve, reject) => {
      const maximumNumberOfRetries = 10;
      const timeInterval = 200;

      let currentAttempt = 0;

      const interval = setInterval(() => {
        if (currentAttempt >= maximumNumberOfRetries) {
          clearInterval(interval);
          reject(new Error("Maximum number of attempts exceeded"));
        } else if (socket.readyState === 1) {
          clearInterval();
          resolve();
        }
        console.log("Reconnect");
        currentAttempt++;
      }, timeInterval);
    });
  };

  const messageHandler = (msg) => {
    msg = JSON.parse(msg);
    switch (msg.action) {
      case "bid":
        setHighestBid(msg.content.bid);
        break;
      case "notification":
        notifyMe(msg);
        break;
      case "chat-message":
        appendMessage(msg);
        break;
    }
  };

  const notifyMe = (msg) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      var notification = new Notification("Hi there!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
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
