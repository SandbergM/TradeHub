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

    return (
      <div>
        <h2 className="text-center mt-4 tradeHub-orange font-weight-bold" onClick={() => console.log(props)}>Registrera</h2>
          <ModalBody>
            <Form>
              <FormGroup className="m-4">
                <Label for="fullName" className="tradeHub-orange font-weight-bold">För- och efternamn</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="För- och efternamn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="m-4">
                <Label for="streetName" className="tradeHub-dark-grey font-weight-bold">Gatunamn</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="streetName"
                placeholder="Gatunamn"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="m-4">
                <Label for="postalCode" className="tradeHub-dark-grey font-weight-bold">Postkod</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Postkod"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="m-4">
                <Label for="city" className="tradeHub-dark-grey font-weight-bold">Stad</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Stad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="m-4">
                <Label for="country" className="tradeHub-dark-grey font-weight-bold">Land</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="text"
                placeholder="Land"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="m-4">
                <Label for="email" className="tradeHub-orange font-weight-bold">Email</Label>
                <Input
                  className="light-grey-background tradeHub-input"
                  type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>
             <FormGroup className="m-4">
                <Label for="password" className="tradeHub-orange font-weight-bold">Lösenord</Label>
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
              <Button className="tradeHub-button col-12 tradeHub-dark-grey font-weight-bold" onClick={() => console.log('Clicked register')}>
                Registrera
              </Button>
            </div>
            <div className="text-right mt-4">
              <i>
                Redan registrerad? Klicka{" "}
                <span className="text-primary click-text inline">
                  <span onClick={() => props.setIsRegistered(!props.isRegistered)}> här</span>
                </span>
              </i>
            </div>
          </ModalBody>
      </div>
    );
}

export default RegisterModal