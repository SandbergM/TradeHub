import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChatRoom from "./ChatRoom";
import ChatLobby from "./ChatLobby";

const ChatModal = ({ modalState, setModalState, receiverId, startInLobby }) => {
  const { user } = useContext(UserContext);
  const [currentRoom, setCurrentRoom] = useState();
  const [showLobby, setShowLobby] = useState(true);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    setTargetId(receiverId);
  }, [receiverId]);

  const goToChatRoom = ({ roomId, targetId }) => {
    setCurrentRoom(roomId);
    setTargetId(targetId);
    setShowLobby(false);
  };

  useEffect(() => {
    setShowLobby(startInLobby);
    return () => {
      setShowLobby(true);
    };
  }, []);

  return (
    <div>
      <Modal isOpen={modalState}>
        <ModalHeader className="">
          {!showLobby && (
            <span
              onClick={() => {
                setShowLobby(true);
              }}
              className="material-icons pointer tradeHub-orange"
            >
              arrow_back
            </span>
          )}
          {showLobby && (
            <span className="material-icons pointer tradeHub-orange">
              import_contacts
            </span>
          )}
        </ModalHeader>
        <ModalBody>
          {showLobby ? (
            <ChatLobby currentUser={user} goToChatRoom={goToChatRoom} />
          ) : (
            <ChatRoom
              receiverId={targetId}
              roomId={currentRoom}
              targetId={targetId}
              setShowLobby={setShowLobby}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="tradeHub-button"
            onClick={() => {
              setModalState(false);
            }}
          >
            Stäng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChatModal;
