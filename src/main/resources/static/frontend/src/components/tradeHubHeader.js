import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import AuthenticationModal from './AuthenticationModal'
import ChatModal from './ChatModal'
import {UserContext} from '../context/UserContext'
import {useHistory, Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

const TradeHubHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chatModalisOpen, setChatModalIsOpen] = useState(false);
  const {user, setUser} = useContext(UserContext)
  let history = useHistory()

  const toggle = () => setIsOpen(!isOpen);

  const goToHomePage = () =>{
    history.push("/")
  }
  const goToMyPage = () =>{
    history.push("/mypage")
    }
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }
  const toggleChatModal = () => {
    setChatModalIsOpen(!modalIsOpen);
  }
  const logout = () =>{
    history.push("/")
    fetch('/logout');
    setUser(null);
  }


  return (
    <div>
      <Navbar className="light-grey-background mb-3" expand="md">
        <NavbarBrand className="text-dark pointer" onClick={goToHomePage}>
          <h3 className="my-auto ml-1 p-2">
            Trade
            <span className="orange-background tradeHub-white borderRadius ml-1">
              Hub
            </span>
          </h3>
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
                  <NavLink
                    className="tradeHub-grey pointer"
                    onClick={goToMyPage}
                  >
                    Min sida
                  </NavLink>
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
        <span className="material-icons" onClick={toggleChatModal}>chat</span>
        <ChatModal
          modalIsOpen={chatModalisOpen}
          toggleModal={toggleChatModal}
          setModalIsOpen={setChatModalIsOpen}
        />
      </div>
    </div>
  );
};

export default withRouter(TradeHubHeader);
