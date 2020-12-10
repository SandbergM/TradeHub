import React, { useState, useContext } from "react";
import LoginModal from "./LoginAndRegisterModal/LoginModal";
import RegisterModal from "./LoginAndRegisterModal/RegisterModal";
import { UserContext } from "../../context/UserContext";

import { Modal } from "reactstrap";

const AuthenticationModal = (props) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const { fetchUser } = useContext(UserContext);

  return (
    <div>
      <Modal isOpen={props.modalIsOpen} toggle={props.toggleModal} size="lg">
        {isRegistered ? (
          <LoginModal
            setIsRegistered={setIsRegistered}
            isRegistered={isRegistered}
            toggle={props.toggleModal}
            modalIsOpen={props.modalIsOpen}
            setModalIsOpen={props.setModalIsOpen}
          />
        ) : (
          <RegisterModal
            setIsRegistered={setIsRegistered}
            isRegistered={isRegistered}
            toggle={props.toggleModal}
            modalIsOpen={props.modalIsOpen}
            setModalIsOpen={props.setModalIsOpen}
            fetchUser={fetchUser}
          />
        )}
      </Modal>
    </div>
  );
};

export default AuthenticationModal;
