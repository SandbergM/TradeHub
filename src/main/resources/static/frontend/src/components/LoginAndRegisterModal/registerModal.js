import React, {useState} from "react";
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
  const [fullName, setFullName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageShown, setErrorMessageShown] = useState(false);

  const performRegistration = async (e) => {
    e.preventDefault();

    let userInformation = {
      "email": email,
      "password": password,
      "fullName": fullName,
      "address": {
        "streetName": streetName,
        "postalCode": postalCode,
        "city": city,
        "country": country
      }
    }

    let response = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformation)
    });

    if (response.status == 400) {
      setErrorMessageShown(true);
     
    }
    else {
      setErrorMessageShown(false);
      props.setModalIsOpen(!props.modalIsOpen)
  
    }
  }
    return (
      <div className="mx-auto authentication-modals">
        <h2 className="mt-4 text-center tradeHub-orange font-weight-bold col-sm-12 col-lg-12">Registrera</h2>
          <ModalBody className="m-4">
            <Form onSubmit={performRegistration} className="row">
              <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="fullName" className="tradeHub-orange font-weight-bold">För- och efternamn</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="För- och efternamn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
            </FormGroup>
             <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="streetName" className="tradeHub-dark-grey font-weight-bold">Gatunamn</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="streetName"
                placeholder="Gatunamn"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                required
                />
            </FormGroup>
             <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="postalCode" className="tradeHub-dark-grey font-weight-bold">Postkod</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Postkod"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="city" className="tradeHub-dark-grey font-weight-bold">Stad</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Stad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </FormGroup>
             <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="country" className="tradeHub-dark-grey font-weight-bold">Land</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Land"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </FormGroup>
             <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="email" className="tradeHub-orange font-weight-bold">Email</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </FormGroup>
             <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <Label for="password" className="tradeHub-orange font-weight-bold">Lösenord</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              {errorMessageShown ? <div className="error-text mb-2 text-center font-weight-bold">Det finns redan ett konto med den emailadressen</div>
                : <Label for="password" className="tradeHub-white font-weight-bold">----</Label>}
                 <Button className="tradeHub-button col-12 font-weight-bold register-button">
                Registrera
              </Button>
              </FormGroup>
            </Form>
            <div className="text-center mt-4">
             <p className="font-italic mb-0">
              Har du redan ett konto?
                </p>
                <p className="font-italic"> Logga in{" "}
                <span className="text-primary click-text inline">
                  <span onClick={() => props.setIsRegistered(!props.isRegistered)}>här</span>
                </span>
              </p>
            </div>
          </ModalBody>
      </div>
    );
}

export default RegisterModal