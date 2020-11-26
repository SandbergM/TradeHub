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

const RegisterModal = (props) => {

      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);

    return (
      <div>
          <h2 className="text-center mt-4 tradeHub-orange">Register</h2>
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
              <Button className="tradeHub-button  col-12" onClick={}>
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
      </div>
    );
}

export default RegisterModal