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
      <div className="row mx-auto authentication-modals">
          <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">Logga in</h2>
          <ModalBody className="">
            <Form className="">
              <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
                <Label for="emailAddress" className="tradeHub-dark-grey font-weight-bold">Email</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="email"
                placeholder="Email"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
                <Label for="password" className="tradeHub-dark-grey font-weight-bold">Lösenord</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="password"
                placeholder="Lösenord"
                   value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Button className="tradeHub-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold">
                Logga in
              </Button>
           
              </FormGroup>
            </Form>
            <div className="text-center m-4">
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