import React, { useState, useEffect, useContext } from "react";
import { Input, Label, Form, Button } from "reactstrap";
import {UserContext} from '../context/UserContext'
import {SocketContext} from '../context/SocketContext'


const ChatComponent = ({activeAuction}) =>{
const [messageSender, setMessageSender] = useState('')
const [messageText, setMessageText] = useState("")
const { user } = useContext(UserContext)
const {sendMessage} = useContext(SocketContext)

  const newMessage = () => {
    let message = {
      receiver: activeAuction.seller,
      message: messageText,
    };
      fetch("/api/v1/chatMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      });
            setMessageText("");
    }

  
  return (
    <div>
     <Input type="text" 
     placeholder="Skriv ditt meddelande"
     onChange={(e) => setMessageText(e.target.value)}/>
      <Button onClick={newMessage}>Skicka</Button>
    </div>
  );
}
export default ChatComponent