import React, { useState, useEffect, useContext } from "react";
import { Input, Label, Form, Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

const ChatRoom = ({ receiverId }) => {
  const [messageSender, setMessageSender] = useState("");
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(UserContext);
  const { chatMessages } = useContext(ChatContext);
  const [bool, setBool] = useState(false);
  const [room, setRoom] = useState("");

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
  };

  const getRoom = (roomId) => {
    roomId = "5fcb69fc99ef714df71cc9ab";
    setRoom(roomId);
    setBool(true);
  };

  useEffect(() => {
    console.log(chatMessages);
    if (chatMessages != null || chatMessages != undefined) {
      getRoom("adas");
    }
  }, []);

  return (
    <div>
      {/*    {bool ? (
        <div>
          {chatMessages[room].map((message) => {
            return <p>{message.message}</p>;
          })}{" "}
        </div>
      ) : (
        <p>d</p>
      )} */}

      <Input
        type="text"
        className="mb-2"
        placeholder="Skriv ditt meddelande"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button className="orange-background pl-4 pr-4" onClick={newMessage}>
        Skicka
      </Button>
    </div>
  );
};
export default ChatRoom;
