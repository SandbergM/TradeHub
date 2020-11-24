import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const TradeHubHeader = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className="light-grey-background" expand="md">
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
          <span class="material-icons">chat</span>
        </div>
        <div className="text-right tradeHub-icon">
          <span class="material-icons">menu</span>
        </div>
      </Navbar>
    </div>
  );
}

export default TradeHubHeader