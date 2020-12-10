import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ChatModal from "./ChatModal";
import { Button } from "reactstrap";

const SellerChatModal = ({ receiverId }) => {
  const { user } = useContext(UserContext);

  const [modalState, setModalState] = useState(false);

  return (
    <div>
      {user ? (
        <Button
          className="grey-background chat-with-seller"
          onClick={() => {
            setModalState(!modalState);
          }}
        >
          CHATTA MED SÄLJARE
        </Button>
      ) : (
        <Button disabled className="grey-background chat-with-seller">
          CHATTA MED SÄLJARE
        </Button>
      )}

      <ChatModal
        modalState={modalState}
        setModalState={setModalState}
        receiverId={receiverId}
        startInLobby={false}
      />
    </div>
  );
};

export default SellerChatModal;
