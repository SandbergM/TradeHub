import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChatComponent from './ChatComponent'

const SellerChatModal = ({ activeAuction }) => {

  const { user } = useContext(UserContext);
  
  const [modal, setModal] = useState(false);

  const toggle = async () => {
    setModal(!modal)
    let res = await fetch("/api/v1/chatMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver: "5fc7b40633d6c42e8fb7176a", message: "Dis is da messaje" }),
    });
    res = await res.json()
    console.log(res);
  };

  return (
    <div>
      {user ? (
        <Button onClick={toggle} className="grey-background chat-with-seller">
          CHATTA MED SÄLJARE
        </Button>
      ) : (
        <Button disabled className="grey-background chat-with-seller">
          CHATTA MED SÄLJARE
        </Button>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Chat component here</ModalHeader>
        <ModalBody>
          <ChatComponent/>
        </ModalBody>
        <ModalFooter>
          <Button className="tradeHub-button" onClick={toggle}>
            Stäng chat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SellerChatModal