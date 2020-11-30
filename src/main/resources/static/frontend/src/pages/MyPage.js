import React, { useState,useContext,useEffect } from "react";
import { Row, Col, CardText } from "reactstrap";
import { Collapse, Button, CardBody, Card, CardFooter } from "reactstrap";
import plusImg from '../images/plus.svg'
import { UserContext } from '../context/UserContext'

const MyPage = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMyAuctionsOpen, setIsMyAuctionsOpen] = useState(false);
  const [isMyBidsOpen, setIsMyBidsOpen] = useState(false);
  const [isCreateAuctionOpen, setIsCreateAuctionOpen] = useState(false);
  const userContext = useContext(UserContext);

  const toggleProfile = () => setIsProfileOpen((prevState) => !prevState);
  const toggleAuctions = () => setIsMyAuctionsOpen((prevState) => !prevState);
  const toggleBids = () => setIsMyBidsOpen((prevState) => !prevState);
  const toggleCreateAuction = () => setIsCreateAuctionOpen((prevState) => !prevState);

  const getCurrentUser = async () =>{
    let user2;
   userContext.fetchUser()
    //setTimeout(function(){user2 = user }, 6000);
    
    //console.log( user2)
  }
useEffect(() => {
 // getCurrentUser()
}, [])
 
  return (
    <Row >
      <Col xs="12" sm="2" md="12"className="mb-3"> 
      <h3 className="text-center">WELCOME #name</h3>
      </Col>
        <Col xs="12" sm="2" md="3"className="mb-3">  
          <Button color="secondary" onClick={toggleProfile} block>
            MIN PROFIL
          </Button>
          <Collapse isOpen={isProfileOpen}>
            <Card>
              <CardBody>
                <CardText>Mitt Namn</CardText>
                <CardText>Email:</CardText>
                <CardText>Adress:</CardText>
                <CardText>postkod | stad</CardText>
              </CardBody>
              <CardFooter>
                <Button block>Lägg Till företag</Button>
              </CardFooter>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md="3"className="mb-3"> 
          <Button color="secondary" onClick={toggleAuctions} block>
            MINA AUKTIONER
          </Button>
          <Collapse isOpen={isMyAuctionsOpen} >
            <Card>
              <CardBody>
               <CardText>My auctions component goes here</CardText>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md="3"className="mb-3"> 
          <Button color="secondary" onClick={toggleBids} block>
            MINA BUD
          </Button>
          <Collapse isOpen={isMyBidsOpen}>
            <Card>
              <CardBody>
               <CardText>My bids component goes here</CardText>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md={{ size: 3, offset: 0 }}className="mb-3">
          <Button color="warning" onClick={toggleCreateAuction} block>
           <img src={plusImg}></img>
            SKAPA EN AUKTION
          </Button>
          <Collapse isOpen={isCreateAuctionOpen}>
            <Card>
              <CardBody>
               <CardText>Create auctions component goes here</CardText>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
      
    </Row>
  );
};
export default MyPage;
