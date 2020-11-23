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
        <Button color="warning" onClick={toggle}>
          Login
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <h2 className="text-center m-4 text-warning">Login</h2>
          <ModalBody>
            <Form>
              <FormGroup className="m-4">
                <Label for="emailAddress">Email Address:</Label>
                <Input type="email" placeholder="Email address..." />
              </FormGroup>
              <FormGroup className="m-4">
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="password..."
                />
              </FormGroup>
            </Form>
            <div className="text-center m-4">
              <Button color="warning" onClick={toggle}>
                Do Something
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
}

export default LoginModal