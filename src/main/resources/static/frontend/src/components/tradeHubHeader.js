import React, { useState, useContext } from "react";
import AuthenticationModal from './AuthenticationModal'
import {UserContext} from '../context/UserContext'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

const TradeHubHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {user, setUser} = useContext(UserContext)

  const toggle = () => setIsOpen(!isOpen);

  const goToHomePage = (e) =>{
  e.preventDefault()
  //route to home
  }
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }
  const logout = () =>{
    fetch('/logout');
    setUser(null);
  }


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
              <NavLink className="tradeHub-grey pointer" onClick={goToHomePage}>
                Hem
              </NavLink>
            </NavItem>
            {user === null ? (
              <>
                <NavItem className="tradeHub-grey" onClick={() => toggleModal}>
                  <NavLink
                    className="tradeHub-grey pointer"
                    onClick={toggleModal}
                  >
                    Logga in
                  </NavLink>
                  <AuthenticationModal
                    modalIsOpen={modalIsOpen}
                    toggleModal={toggleModal}
                    setModalIsOpen={setModalIsOpen}
                  />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="tradeHub-grey">
                  <NavLink className="tradeHub-grey pointer">Min sida</NavLink>
                </NavItem>
                <NavItem className="tradeHub-grey">
                  <NavLink className="tradeHub-grey pointer" onClick={logout}>
                    Logga ut
                  </NavLink>
                </NavItem>
              </>
            )}
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
