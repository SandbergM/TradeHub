import React, {useState } from "react";
import LoginModal from './LoginAndRegisterModal/loginModal'
import RegisterModal from './LoginAndRegisterModal/registerModal'

import {
  Modal,
} from "reactstrap";

const AuthenticationModal = (props) => {
  const [isRegistered, setIsRegistered] = useState(true);


    return (
      <div>
        <Modal isOpen={props.modalIsOpen} toggle={props.toggleModal} size="lg">
          {isRegistered ?
            <LoginModal setIsRegistered={setIsRegistered} isRegistered={isRegistered} toggle={props.toggleModal}></LoginModal>
            : <RegisterModal setIsRegistered={setIsRegistered} isRegistered={isRegistered} toggle={props.toggleModal}></RegisterModal>}
        </Modal>
      </div>
    );
}

export default AuthenticationModal