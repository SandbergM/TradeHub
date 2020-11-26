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
        <Modal isOpen={props.modalIsOpen} toggle={props.setModalIsOpen}>
          {isRegistered ?
            <LoginModal setIsRegistered={setIsRegistered} isRegistered={isRegistered}></LoginModal>
            : <RegisterModal setIsRegistered={setIsRegistered} isRegistered={isRegistered}></RegisterModal>}
        </Modal>
      </div>
    );
}

export default AuthenticationModal