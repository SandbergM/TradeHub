import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChatComponent from "./ChatComponent";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ modalIsOpen, toggleModal, setModalIsOpen }) => {
  const { user } = useContext(UserContext);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <ChatRoom />
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

export default ChatModal;
