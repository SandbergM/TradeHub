import React, { useState, useEffect, useContext } from "react";
import { Input, Label, Form, Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const ChatRoom = ({ receiverId }) => {
  const [messageSender, setMessageSender] = useState("");
  const [messageText, setMessageText] = useState("");
  const [roomId, setRoomid] = useState(null);
  const { chatMessages } = useContext(ChatContext);

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

  const fetchRoomId = async () => {
    console.log("FETCHING STUFF WITH ID : ", receiverId);
    let res = await fetch(`/api/v1/chatMessage/room?receiverId=${receiverId}`);
    res = await res.json();
    setRoomid(res.id);
    console.log(res.id);
  };

  useEffect(() => {
    fetchRoomId();
  }, []);

  return (
    <div>
      {chatMessages && chatMessages[roomId] && (
        <div>
          {chatMessages[roomId].map((message) => {
            return <p>{message.message}</p>;
          })}
        </div>
      )}

      <Input
        type="text"
        placeholder="Skriv ditt meddelande"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button
        onClick={() => {
          newMessage();
        }}
      >
        Skicka
      </Button>
    </div>
  );
};
export default ChatRoom;
