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
  const [bool, setBool] = useState(false);


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

  const formattedTime = (timestamp) => {
    let date = new Date(timestamp)
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
      {chatMessages && chatMessages[roomId] && (
        <div>
          {chatMessages[roomId].map((message) => {
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
