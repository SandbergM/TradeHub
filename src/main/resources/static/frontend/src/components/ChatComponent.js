import React, { useState, useEffect } from "react";
import { Input, Label, Form, Button } from "reactstrap";


const ChatComponent = () =>{
const [messageSender, setMessageSender] = useState("Anon")
const [messageText, setMessageText] = useState("")

  const newMessage = () => {
    let message = {
      sender: messageSender,
        content: messageText,
    }
        // timestamp: Date.now()
      setMessageText("")

            // send message with websocket
      
            }

  
  return (
    <div>
      <Input
        onChange={(e) => setMessageSender(e.target.value)}
        placeholder="sender"
      />
      <Input
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="type new message.."
      />
      <Button onClick={newMessage}>:envelope_with_arrow:</Button>
    </div>
  );
}
export default ChatComponent