import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";

const TradeHubHeader = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className="light-grey-background mb-3" expand="md">
        <NavbarBrand className="text-dark " href="/">
          <h2 className="my-auto">
            Trade<span className="orange-background tradeHub-white">Hub</span>
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
        <div className="text-right mr-4 tradeHub-icon">
          <span className="material-icons">chat</span>
        </div>
        <div className="text-right tradeHub-icon">
          <span className="material-icons">menu</span>
        </div>
      </Navbar>
    </div>
  );
}

export default TradeHubHeader