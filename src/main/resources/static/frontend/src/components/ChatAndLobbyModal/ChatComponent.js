import React, { useState } from "react";
import { Input, Button } from "reactstrap";

const ChatComponent = ({ receiverId }) => {
  const [messageText, setMessageText] = useState("");

  const newMessage = () => {
    if (messageText.replace(/\s/g, "").length) {
      let message = {
        receiver: { id: receiverId },
        message: messageText,
      };
      fetch("/api/v1/chatMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      setMessageText("");
      document.getElementById("chat-modal-input-field").value = "";
    }
  };

  return (
    <div>
      <Input
        type="text"
        id="chat-modal-input-field"
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
export default ChatComponent;
