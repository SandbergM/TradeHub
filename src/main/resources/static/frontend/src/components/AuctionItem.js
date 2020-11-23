import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Col
  } from 'reactstrap';


const AuctionItem = ()=>{
return (
    <Col>
    <Card>
      <CardBody>
        <CardTitle tag="h5">TITLE</CardTitle>
      </CardBody>
      <img width="100%" src="/assets/318x180.svg" />
      <CardBody>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
      </CardBody>
    </Card>
    </Col>
)
}

export default AuctionItem 