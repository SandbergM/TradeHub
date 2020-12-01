import React, { useState,useContext } from "react";
import {withRouter} from 'react-router-dom'
import { Row, Col, CardText, CardTitle } from "reactstrap";
import { Collapse, Button, CardBody, Card, CardFooter } from "reactstrap";
import plusImg from '../images/plus.svg'
import { UserContext } from '../context/UserContext'
import AuctionsList from '../components/AuctionList'
import RegisterNewAction from '../components/RegisterNewAuction'

const MyPage = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isMyAuctionsOpen, setIsMyAuctionsOpen] = useState(false);
  const [isMyBidsOpen, setIsMyBidsOpen] = useState(false);
  const [isCreateAuctionOpen, setIsCreateAuctionOpen] = useState(false);
  const {user} = useContext(UserContext);

  const toggleProfile = () => setIsProfileOpen((prevState) => !prevState);
  const toggleAuctions = () => setIsMyAuctionsOpen((prevState) => !prevState);
  const toggleBids = () => setIsMyBidsOpen((prevState) => !prevState);
  const toggleCreateAuction = () => setIsCreateAuctionOpen((prevState) => !prevState);

 
  return (
    <Row >
      <Col xs="12" sm="2" md="12"className="mb-3"> 
  <h3 className="text-center tradeHub-orange m-4">Välkommen {user.fullName}</h3>
      </Col>
        <Col xs="12" sm="2" md="4"className="mb-3">  
          <Button className="light-grey-background tradeHub-grey bold noBorder" onClick={toggleProfile} block>
            MIN PROFIL
          </Button>
          <Collapse isOpen={isProfileOpen}>
            <Card className="grey-background tradeHub-white">
              <CardBody>
                <CardTitle className="mb-4 bold">{user.fullName}</CardTitle>
                <CardText><span className="bold">Email :</span>  {user.email}</CardText>
                <CardText><span className="bold">Adress :</span>  {user.address.streetName}</CardText>
                <CardText>{user.address.postalCode} | {user.address.city}</CardText>
              </CardBody>
              <CardFooter>
                <Button className="light-grey-background tradeHub-grey bold noBorder" block>Lägg Till företag</Button>
              </CardFooter>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md="4"className="mb-3"> 
          <Button className="light-grey-background tradeHub-grey bold noBorder" onClick={toggleAuctions} block>
            MINA AUKTIONER
          </Button>
          <Collapse isOpen={isMyAuctionsOpen} >
            <Card>
              <CardBody>
              <AuctionsList fetch={"/myPostedAuctions"} xs={1} sm={1} md={1}/>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md="4"className="mb-3"> 
          <Button className="light-grey-background tradeHub-grey bold noBorder" onClick={toggleBids} block>
            MINA BUD
          </Button>
          <Collapse isOpen={isMyBidsOpen}>
            <Card>
              <CardBody>
              <AuctionsList fetch={"/myPostedBids"} xs={1} sm={1} md={1}/>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
        <Col xs="12" sm="2" md={{ size: 4, offset: 4 }}className="mb-3">
          <Button className="tradeHub-button bold" onClick={toggleCreateAuction} block>
           <span className="bold addIcon">+ </span>
            SKAPA EN AUKTION
          </Button>
          <Collapse isOpen={isCreateAuctionOpen}>
            <Card>
              <CardBody>
               <RegisterNewAction/>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
      
    </Row>
  );
};
export default withRouter(MyPage) ;
