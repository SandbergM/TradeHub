import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const Socket = (props) => {
  function connect() {
    ws = new WebSocket("ws://localhost:8080/tradeHubSocket");
    ws.onmessage = (e) => {
      let dataWrapper;
      try {
        dataWrapper = JSON.parse(e.data);
      } catch {
        console.warn("Could not parse:", e.data);
        return;
      }

      switch (dataWrapper.action) {
        case "message":
          console.log("New message:", dataWrapper.payload);
          let messages = ChatContext.chatMessages;
          messages.push(dataWrapper.payload);
          ChatContext.setChatMessages(messages);

          break;
        case "user-status":
          console.log("New status change:", dataWrapper.payload);
          break;
        default:
          console.log("Could not read action:", dataWrapper.action);
      }
    };

    ws.onopen = (e) => {
      send({
        action: "connection",
        payload: "user connected",
      });
      isConnected = true;
    };

    ws.onclose = (e) => {
      console.log("Closing websocket...");
    };

    console.log("Connecting...");
  }

  useEffect(() => {
    connect();
  }, []);

  function disconnect() {
    if (ws != null) {
      ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
  }

  function send(data) {
    ws.send(JSON.stringify(data));
  }

  function sendMessage(message) {
    send({
      action: "message",
      payload: message,
    });
  }

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};
