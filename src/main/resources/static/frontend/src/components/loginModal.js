import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const LoginModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className="login-button" onClick={toggle}>
        Login
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <h2 className="text-center mt-4 tradeHub-orange">Login</h2>
        <ModalBody>
          <Form>
            <FormGroup className="m-4">
              <Label className="m-1 font-weight-bold" for="emailAddress">
                Email Address
              </Label>
              <Input
                className="light-grey-background"
                type="email"
                placeholder="Enter your email address here"
              />
            </FormGroup>
            <FormGroup className="m-4">
              <Label className="m-1 font-weight-bold" for="password">
                Password
              </Label>
              <Input
                className="light-grey-background"
                type="password"
                placeholder="Enter your password here"
              />
            </FormGroup>
          </Form>
          <div className="text-center ml-4 mr-4 mb-0 mt-5">
            <Button className="orange-background col-12" onClick={toggle}>
              Login
            </Button>
          </div>
          <div className="text-right ml-5 mr-5 mb-5 mt-2 register-text">
            <i>
              Can't login? Create new account{" "}
              <span className="text-primary click-text inline">
                <span>here</span>
              </span>
            </i>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
