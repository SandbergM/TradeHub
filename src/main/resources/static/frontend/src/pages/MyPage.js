import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import {
    Dropdown, DropdownMenu, DropdownToggle,Button,DropdownItem
} from "reactstrap";

const MyPage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <Row>
      <Col>
        <div>
          <h1>WELCOME!</h1>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="my-dropdown" my-dropdowncaret>
            MIN PROFIL
          </DropdownToggle>
          <DropdownMenu className="my-dropdownenu-menu">
            <DropdownItem>Mitt namn</DropdownItem>
            <DropdownItem>EMAIL: </DropdownItem>
            <DropdownItem>ADRESS:</DropdownItem>
            <DropdownItem>postal code | city</DropdownItem>
            <DropdownItem divider />
            <Button size="lg" block>Lägg Till Företag</Button>
          </DropdownMenu>
        </Dropdown>
        </div>
      </Col>
    </Row>
  );
};
export default MyPage;
