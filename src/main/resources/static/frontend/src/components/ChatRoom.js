import React, { useState, useEffect, useContext } from "react";
import { Input, Label, Form, Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const ChatRoom = ({ receiverId }) => {
  const [messageSender, setMessageSender] = useState("");
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
    setMessages(backlogConversation);
  };

  useEffect(() => {
    fetchConversation();
    return () => {
      setMessages([]);
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

  const formattedTime = (timestamp) => {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  };

  return (
    <div>
      {messages && (
        <div>
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
          })}{" "}
        </div>
      )}

      <Input
        className="mt-3"
        type="text"
        placeholder="Skriv ditt meddelande"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button className="mt-2 pl-4 pr-4" onClick={newMessage}>
        SKICKA MEDDELANDE
      </Button>
    </div>
  );
};
export default ChatRoom;
