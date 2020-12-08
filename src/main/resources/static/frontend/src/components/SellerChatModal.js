import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChatRoom from "./ChatRoom";

const SellerChatModal = ({ receiverId }) => {
  const { user } = useContext(UserContext);

  const [modal, setModal] = useState(false);

  const toggle = async () => {
    setModal(!modal);
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
        <ModalHeader toggle={toggle}>Chatta med säljare</ModalHeader>
        <ModalBody>
          <ChatRoom receiverId={receiverId} />
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

export default SellerChatModal;
