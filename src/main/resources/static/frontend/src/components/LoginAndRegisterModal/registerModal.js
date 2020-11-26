import React from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  
} from "reactstrap";

const RegisterModal = (props) => {
    return (
      <div>
        <ModalHeader toggle={props.toggleModal}> <h2 className="text-center mt-4 tradeHub-orange" onClick={() => console.log(props)}>Registrera</h2></ModalHeader>
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
              <Button className="tradeHub-button  col-12" onClick={() => console.log('Clicked register')}>
                Login
              </Button>
            </div>
            <div className="text-right mt-4">
              <i>
                Already registered? Log in{" "}
                <span className="text-primary click-text inline">
                  <span onClick={() => props.setIsRegistered(!props.isRegistered)}> here</span>
                </span>
              </i>
            </div>
          </ModalBody>
      </div>
    );
}

export default RegisterModal