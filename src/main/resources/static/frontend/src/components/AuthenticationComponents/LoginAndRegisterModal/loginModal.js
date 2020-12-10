import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import PasswordInputField from './PasswordInputField'
import { Button, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const { setUser,fetchUser } = useContext(UserContext);

  const performLogin = async (e) => {
    e.preventDefault();
    const credentials =
      "username=" +
      encodeURIComponent(email) +
      "&password=" +
      encodeURIComponent(password);

    let response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: credentials,
    });

    if (response.url.includes("error")) {
      setErrorMessageShown(true);
    } else {
      fetchUser()
      setErrorMessageShown(false);
      props.setModalIsOpen(!props.modalIsOpen);
    }
  };
  return (
    <div className="row mx-auto authentication-modals">
      <h2 className="text-center mt-4 tradeHub-orange font-weight-bold col-12">
        Logga in
      </h2>
      <ModalBody className="">
        <Form onSubmit={performLogin}>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
            <Label
              for="emailAddress"
              className="tradeHub-dark-grey font-weight-bold"
            >
              Email
            </Label>
            <Input
              required
              className="light-grey-background tradeHub-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            <PasswordInputField setPassword={ setPassword } password={ password }/>
          </FormGroup>
          <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            {errorMessageShown ? (
              <div className="error-text mb-2 text-center font-weight-bold">
                Felaktigt användarnamn eller lösenord{" "}
              </div>
            ) : (
              ""
            )}
            <Button className="tradeHub-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold">
              Logga in
            </Button>
          </FormGroup>
        </Form>
        <div className="text-center m-4">
          <p className="font-italic mb-0">Har du inte ett konto?</p>
          <p className="font-italic">
            {" "}
            Skapa konto{" "}
            <span className="text-primary click-text inline">
              <span onClick={() => props.setIsRegistered(!props.isRegistered)}>
                här
              </span>
            </span>
          </p>
        </div>
      </ModalBody>
    </div>
  );
};

export default LoginModal;
