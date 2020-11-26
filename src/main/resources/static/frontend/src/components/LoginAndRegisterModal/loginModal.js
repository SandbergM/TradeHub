import React, {useState} from "react";
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
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    return (
      <div className="row mx-auto">
          <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-sm-12">Logga in</h2>
          <ModalBody className="">
            <Form className="">
              <FormGroup className="col-sm-8 col-lg-12 m-0">
                <Label for="emailAddress" className="tradeHub-dark-grey font-weight-bold">Email</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="email"
                placeholder="Email"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="col-sm-8 col-lg-12 mt-2">
                <Label for="password" className="tradeHub-dark-grey font-weight-bold">Lösenord</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="password"
                placeholder="Lösenord"
                   value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Form>
            <div className="text-center m-4">
              <Button className="tradeHub-button col-sm-8 col-lg-8" onClick={() => console.log("Clicked")}>
                Logga in
              </Button>
            </div>
            <div className="text-center">
              <p className="font-italic mb-0">
              Har du inte ett konto?
                </p>
                <p className="font-italic"> Skapa konto{" "}
                <span className="text-primary click-text inline">
                  <span onClick={() => props.setIsRegistered(!props.isRegistered)}>här</span>
                </span>
              </p>
            </div>
          </ModalBody>
      </div>
    );
}

export default LoginModal