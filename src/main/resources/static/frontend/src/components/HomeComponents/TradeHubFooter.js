import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TradeHubFooter = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
 
      let debounceID = null;
      const debounceHelper = () => {
        if (debounceID !== null) {
          clearTimeout(debounceID);
          debounceID = null;
        }
        debounceID = setTimeout(() => {
          setModal(false)
        }, 600);
      };

      useEffect(() => {
        if(modal){
          debounceHelper()
        }
      },[modal])

      
  return (
    <div className="pt-2">
      <footer onClick={toggle}>
        <hr></hr>
        <p className="font-weight-bold m-0">&#169; Trade Hub AB 2020</p>
        <p className="m-0">Happy Road 21, 234 67 Los Angeles, USA</p>
        <p>067 - 345 456 56 | tradehub@hublife.com</p>
      </footer>
      <Modal isOpen={modal} toggle={toggle} backdrop={false}>
        <ModalHeader toggle={toggle} className="text-center mx-auto">
          Påsk ägg
        </ModalHeader>
        <ModalBody>
          <p>Daggmask was here</p>
          <img src="https://memes.memedrop.io/production/eRyN1q0D563m/292w_s.jpg"></img>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default TradeHubFooter;
