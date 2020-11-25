import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import auctionDetailsData from "./auctionDetailsData";


const auctionDetailsModal = (props) => {

  const {auction} = props

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
  <ModalHeader toggle={toggle}>{auction.title}</ModalHeader>
        <ModalBody>
          <auctionDetailsData auction={auction}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default auctionDetailsModal