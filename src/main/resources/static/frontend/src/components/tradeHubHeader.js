import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
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
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="tradeHub-grey" href="/">
                Hem
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="tradeHub-grey" href="/login">
                Logga in
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <div
          className="text-right tradeHub-icon"
          onClick={toggle}
          id="hamburger-position"
        >
          <span className="material-icons">menu</span>
        </div>
      </Navbar>
      <div className="text-right mr-4 tradeHub-icon" id="bubble-position">
        <span className="material-icons">chat</span>
      </div>
    </div>
  );
};

export default TradeHubHeader;