import React,{useContext,useEffect} from 'react'
import {ChatContext} from '../context/ChatContext' 



let ws;
let isConnected = false;
connect();

function connect() {
  // change PORT to your backends PORT

  //NOTE: Need to find the correct WebSocket URL!
    ws = new WebSocket("ws://localhost:8080/tradeHubSocket");
//   ws = new WebSocket("ws://tradeHubSocket");

  // onmessege listens to incoming websocket messages
  // from the backend
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

        // this will trigger a re-render of all components using the messages

        //Fix here for store and add message
        // store.commit("prependMessage", dataWrapper.payload);
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

function disconnect() {
  if (ws != null) {
    ws.close();
  }
  isConnected = false;
  console.log("Disconnected");
}

  let TimeoutId = null;

  const debounceTimeout = (message) => {
    if (TimeoutId !== null) {
      clearTimeout(TimeoutId);
      TimeoutId = null;
    }
    TimeoutId = setTimeout(() => {
      shitFicks(message)
    }, 5000);
  };

 function shitFicks(message) {
     console.log(message);
   sendMessage(message)
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

export { send, sendMessage, debounceTimeout};