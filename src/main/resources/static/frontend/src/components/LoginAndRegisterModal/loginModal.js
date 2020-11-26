import React from "react";
import {
  Button,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  
} from "reactstrap";

const LoginModal = (props) => {
    return (
      <div>
        <ModalHeader toggle={props.toggleModal}>
          <h2 className="text-center mt-4 tradeHub-orange">Logga in</h2>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup className="m-4">
                <Label for="emailAddress">Email:</Label>
                <Input
                  className="light-grey-background"
                  type="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup className="m-4">
                <Label for="password">Lösenord</Label>
                <Input
                  className="light-grey-background"
                  type="password"
                  placeholder="Lösenord"
                />
              </FormGroup>
            </Form>
            <div className="text-center m-4">
              <Button className="tradeHub-button col-12" onClick={() => console.log("Clicked")}>
                Login
              </Button>
            </div>
            <div className="text-right mt-4">
              <i>
                Can't login? Create new account{" "}
                <span className="text-primary click-text inline">
                  <span onClick={() => props.setIsRegistered(!props.isRegistered)}>here</span>
                </span>
              </i>
            </div>
          </ModalBody>
      </div>
    );
}

export default LoginModal