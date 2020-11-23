import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const LoginModal = () => {

      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);

    return (
      <div>
        <Button className="tradeHub-button" onClick={toggle}>
          Login
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <h2 className="text-center mt-4 tradeHub-orange">Login</h2>
          <ModalBody>
            <Form>
              <FormGroup className="m-4">
                <Label for="emailAddress">Email Address:</Label>
                <Input
                  className="light-grey-background"
                  type="email"
                  placeholder="Email address..."
                />
              </FormGroup>
              <FormGroup className="m-4">
                <Label for="password">Password</Label>
                <Input
                  className="light-grey-background"
                  type="password"
                  placeholder="Password..."
                />
              </FormGroup>
            </Form>
            <div className="text-center m-4">
              <Button className="tradeHub-button  col-12" onClick={toggle}>
                Login
              </Button>
            </div>
            <div className="text-right mt-4">
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
}

export default LoginModal