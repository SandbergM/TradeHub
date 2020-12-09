import React, { useState, useEffect, useContext } from "react";
import { Input, Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const ChatRoom = ({ receiverId }) => {
  const [messageText, setMessageText] = useState("");
  const [roomId, setRoomid] = useState(null);
  const { chatMessages } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const newMessage = async () => {
    console.log("sending");
    let message = {
      receiver: { id: receiverId },
      message: messageText,
    };

    await fetch("/api/v1/chatMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    setMessageText("");
  };

  const fetchConversation = async () => {
    let roomRaw = await fetch(`/api/v1/chatMessage/room/${receiverId}`);
    let room = await roomRaw.json();
    setRoomid(room.id);
    let backlogConversationRaw = await fetch(
      `/api/v1/chatMessage/conversation/${room.id}`
    );
    let backlogConversation = await backlogConversationRaw.json();
    setMessages([...backlogConversation.reverse(), ...messages]);
  };

  useEffect(() => {
    fetchConversation();
    return () => {
      setMessages([]);
      setRoomid(null);
    };
  }, []);

  useEffect(() => {
    if (chatMessages[roomId] !== undefined) {
      setMessages([
        ...messages,
        chatMessages[roomId][chatMessages[roomId].length - 1],
      ]);
    }
  }, [chatMessages[roomId] && chatMessages[roomId].length]);

  useEffect(() => {
    document.getElementById("chat-scroll-trigger").click();
  }, [messages]);

  const formattedTime = (timestamp) => {
    let date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    return formattedTime;
  };

  return (
    <div>
      {messages && (
        <div id="chat-message-container">
          <a href="#chat-bottom" id="chat-scroll-trigger"></a>
          {messages.map((message) => {
            return user.id === message.sender.id ? (
              <div className="mt-2 mb-2 p-1">
                <p className="m-0 mb-2 ml-1 p-0 message-time">
                  <span className="bold message-sender">
                    {message.sender.fullName}
                  </span>
                  , {formattedTime(message.timestamp)}
                </p>
                <span className="orange-background tradeHub-white p-2 pl-3 pr-3 borderRadius5">
                  {message.message}
                </span>
              </div>
            ) : (
              <div className="mt-2 mb-2 p-1 text-right">
                <p className="m-0 mb-2 ml-1 p-0 message-time">
                  {formattedTime(message.timestamp)},{" "}
                  <span className="bold message-sender">
                    {message.sender.fullName}
                  </span>
                </p>
                <span className="grey-background tradeHub-white p-2 pl-3 pr-3 borderRadius5">
                  {message.message}
                </span>
              </div>
            );
          })}
          <a id="chat-bottom"></a>
        </div>
      )}

      <Input
        className="mt-3"
        type="text"
        placeholder="Skriv ditt meddelande"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button className="mt-2 pl-4 pr-4" onClick={newMessage}>
        SKICKA MEDDELANDE
      </Button>
    </div>
  );
};
export default ChatRoom;
