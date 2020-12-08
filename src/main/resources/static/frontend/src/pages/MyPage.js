import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  CardText,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  CardBody,
  Card,
  CardFooter,
} from "reactstrap";
import { UserContext } from "../context/UserContext";
import AuctionsList from "../components/AuctionList";
import RegisterNewAuction from "../components/RegisterNewAuction";

const MyPage = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isMyAuctionsOpen, setIsMyAuctionsOpen] = useState(false);
  const [isMyBidsOpen, setIsMyBidsOpen] = useState(false);
  const [isCreateAuctionOpen, setIsCreateAuctionOpen] = useState(false);
  const [isShowingCompanyInput, setIsShowingCompanyInput] = useState(false);
  const [isShowingButton, setIsShowingButton] = useState(true);
  const [companyName, setCompanyName] = useState(null);
  const [companyNumber, setCompanyNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [succesMessage, setSuccessMessage] = useState("")
  const { user, fetchUser } = useContext(UserContext);

  const toggleProfile = () => setIsProfileOpen((prevState) => !prevState);
  const toggleAuctions = () => setIsMyAuctionsOpen((prevState) => !prevState);
  const toggleBids = () => setIsMyBidsOpen((prevState) => !prevState);
  const toggleCreateAuction = () =>
    setIsCreateAuctionOpen((prevState) => !prevState);

  const toggleIsShowingCompanyInput = () => {
    setIsShowingButton((prevState) => !prevState);
    setIsShowingCompanyInput((prevState) => !prevState);
  };

  const getUserInfo = (userDetail) => {
    if (user != null || user != undefined) {
      switch (userDetail) {
        case "fullName":
          userDetail = user.fullName;
          break;
        case "email":
          userDetail = user.email;
          break;
        case "streetName":
          userDetail = user.address.streetName;
          break;
        case "postalCode":
          userDetail = user.address.postalCode;
          break;
        case "city":
          userDetail = user.address.city;
          break;
        case "company":
          if (user.company) {
            userDetail = user.company.name;
          }
          break;
        case "companyNumber":
          if (user.company) {
            userDetail = user.company.organizationNumber;
          }
      }
      return userDetail;
    }
  };

  const submitCompanyData = async (e) => {
    e.preventDefault();
    const company = { name: companyName, organizationNumber: companyNumber };
    let res = await fetch("/api/v1/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company),
    }).catch(console.warn);
    if (res.status == 200) {
      setIsShowingCompanyInput((prevState) => !prevState);
      setErrorMessage(null)
      fetchUser()
      setSuccessMessage("Ditt företag är nu registrerat hos oss!")
    } else if (res.status == 400) {
      setErrorMessage("Felaktiga uppgifter, vänligen försök igen");
    }
  };

  return (
    <Row>
      <Col xs="12" sm="2" md="12" className="mb-3">
        <h3 className="text-center tradeHub-orange m-4">
          Välkommen {getUserInfo("fullName")}
        </h3>
      </Col>
      <Col xs="12" sm="2" md="4" className="mb-3">
        <Button
          className="light-grey-background tradeHub-grey bold noBorder"
          onClick={toggleProfile}
          block
        >
          MIN PROFIL
        </Button>
        <Collapse isOpen={isProfileOpen}>
          <Card className="grey-background tradeHub-white">
            <CardBody>
              <CardTitle className="mb-4 bold">
                {getUserInfo("fullName")}
              </CardTitle>
              <CardText>
                <span className="bold">Email :</span> {getUserInfo("email")}
              </CardText>
              <CardText>
                <span className="bold">Adress :</span>{" "}
                {getUserInfo("streetName")}
              </CardText>
              <CardText>
                {getUserInfo("postalCode")} | {getUserInfo("city")}
              </CardText>
            </CardBody>
            <CardFooter>
              {user !== null && user.company !== null ? (
                <div>
                  <p>{succesMessage}</p>
                  <div className="bold mb-2">{getUserInfo("company")}</div>
                  <div className="">{getUserInfo("companyNumber")}</div>
                </div>
              ) : isShowingButton ? (
                <Button
                  onClick={toggleIsShowingCompanyInput}
                  className="light-grey-background tradeHub-grey bold noBorder"
                  block
                >
                  LÄGG TILL FÖRETAG
                </Button>
              ) : (
                ""
              )}

              {isShowingCompanyInput ? (
                <Form>
                  <FormGroup>
                    <Label for="companyName" className="tradeHub-white">
                      Företagsnamn
                    </Label>
                    <Input
                      required
                      className="white-background tradeHub-input"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="companyNumber" className="tradeHub-white ">
                      Företags/Organisations Nummer
                    </Label>
                    <Input
                      required
                      className="white-background tradeHub-input"
                      type="text"
                      value={companyNumber}
                      onChange={(e) => setCompanyNumber(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    {errorMessage==null ? (<p></p>):(<p className="error-text">{errorMessage}</p>)}
                    <Button
                      onClick={submitCompanyData}
                      className="tradeHub-button font-weight-bold mb-1 pl-4 pr-4"
                    >
                      LÄGG TILL FÖRETAG
                    </Button>
                    <Button
                      onClick={toggleIsShowingCompanyInput}
                      className="tradeHub-button float-right font-weight-bold mb-1 pl-3 pr-3"
                    >
                      STÄNG
                    </Button>
                  </FormGroup>
                </Form>
              ) : (
                ""
              )}
            </CardFooter>
          </Card>
        </Collapse>
      </Col>

      <Col xs="12" sm="2" md="4" className="mb-3">
        <Row>
          <Col xs="12" sm="12" md="12" className="mb-3">
            <Button
              className="light-grey-background tradeHub-grey bold noBorder"
              onClick={toggleAuctions}
              block
            >
              MINA AUKTIONER
            </Button>
            <Collapse isOpen={isMyAuctionsOpen}>
              <Card>
                <CardBody>
                  <AuctionsList
                    fetch={"/myPostedAuctions"}
                    xs={1}
                    sm={1}
                    md={1}
                  />
                </CardBody>
              </Card>
            </Collapse>
          </Col>
          <Col xs="12" sm="12" md="12" className="mb-3">
            <Button
              className="light-grey-background tradeHub-grey bold noBorder"
              onClick={toggleBids}
              block
            >
              MINA BUD
            </Button>
            <Collapse isOpen={isMyBidsOpen}>
              <Card>
                <CardBody>
                  <AuctionsList fetch={"/myPostedBids"} xs={1} sm={1} md={1} />
                </CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
      </Col>

      <Col xs="12" sm="2" md={{ size: 4, offset: 0 }} className="mb-3">
        <Button
          className="tradeHub-button bold"
          onClick={toggleCreateAuction}
          block
        >
          <span className="bold addIcon">+ </span>
          SKAPA EN AUKTION
        </Button>
        <Collapse isOpen={isCreateAuctionOpen}>
          <Card>
            <CardBody>
              <RegisterNewAuction />
            </CardBody>
          </Card>
        </Collapse>
      </Col>
    </Row>
  );
};
export default withRouter(MyPage);
