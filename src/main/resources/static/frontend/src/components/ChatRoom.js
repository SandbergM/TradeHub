import React, { useState, useEffect, useContext } from "react";
import { Input, Label, Form, Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const ChatRoom = ({ receiverId }) => {
  const [messageSender, setMessageSender] = useState("");
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(UserContext);
  const { chatMessages } = useContext(ChatContext);

  const newMessage = async () => {
    console.log(chatMessages);
    console.log(receiverId);
    let message = {
      receiver: { id: receiverId },
      message: messageText,
    };

    let res = await fetch("/api/v1/chatMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    setMessageText("");
    res = await res.json();
    console.log(res.roomId);

    console.log(chatMessages)
  };

  return (
    <div>
      {
        chatMessages.map((messages) => {
          console.log(messages);
          return <p>{messages.content.message}</p>;
        })}

      <Input
        type="text"
        placeholder="Skriv ditt meddelande"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button onClick={newMessage}>Skicka</Button>
    </div>
  );
};
export default ChatRoom;
