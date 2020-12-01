import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SellerChatModal = ({ activeAuction }) => {
  console.log(activeAuction);

  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
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
        <ModalHeader toggle={toggle}>
          <span className="tradeHub-orange">{activeAuction.seller ? activeAuction.seller.fullName : null}</span> / {user ? user.fullName : null}
        </ModalHeader>
        <ModalBody>Chat component here</ModalBody>
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