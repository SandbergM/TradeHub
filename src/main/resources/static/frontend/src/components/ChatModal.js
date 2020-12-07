import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ modalIsOpen, toggleModal, setModalIsOpen }) => {
  const [modal, setModal] = useState(false);
  const [showLobby, setShowLobby] = useState(true);
  const [userToChatWith, setUserToChatWith] = useState(null);
  const [contacts] = useState([
    { name: "Oskar", update: true },
    { name: "Kalle", update: false },
    { name: "TuttiPrutti", update: false },
  ]);
  const { user } = useContext(UserContext);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleLobby = () => setShowLobby((prevState) => !prevState);

  const enterChatroom = (aUserToChatWith) => {
    setShowLobby(false);
    setUserToChatWith(aUserToChatWith);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader className="tradeHub-orange" toggle={toggle}>
          {showLobby
            ? user.fullName + " Lobby"
            : user.fullName + " / " + userToChatWith}
        </ModalHeader>
        <ModalBody>
          {showLobby ? (
            contacts.map((contact) => {
              if (!contact.update) {
                return (
                  <div
                    onClick={enterChatroom(contact.name)}
                    className="light-grey-background p-3 bold m-2 contact"
                  >
                    {contact.name}
                  </div>
                );
              } else {
                return (
                  <div className="text-white orange-background p-3 bold m-2 contact">
                    {contact.name}
                  </div>
                );
              }
            })
          ) : (
            <ChatRoom />
          )}
        </ModalBody>
        <ModalFooter>
          {showLobby ? (
            <Button className="tradeHub-button mr-1" onClick={toggle}>
              Stäng
            </Button>
          ) : (
            <div>
              <Button
                className="grey-background tradeHub-button"
                onClick={toggleLobby}
              >
                Tillbaka till Lobbyn
              </Button>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChatModal;
