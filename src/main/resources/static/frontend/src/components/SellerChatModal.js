import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SellerChatModal = ({ activeAuction }) => {
  console.log(activeAuction);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        onClick={toggle}
        className="grey-background chat-with-seller"
      >
        CHATTA MED SÄLJARE
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="tradeHub-orange">
          {activeAuction.seller.fullName}
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