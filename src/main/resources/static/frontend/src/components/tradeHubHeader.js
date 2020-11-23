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
        <NavbarBrand className="ml-4 text-dark " href="/">
          <h2 className="my-auto">
            Trade<span className="orange-background tradeHub-white">Hub</span>
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
  // <div className="light-grey-background container col-12">
  //   <h1 className="ml-4 tradeHub-orange">#Logo</h1>
  // </div>;
}

export default TradeHubHeader