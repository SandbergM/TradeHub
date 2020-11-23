import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Col
  } from 'reactstrap';


const AuctionItem = ()=>{
return (
    <Col >
    <Card body className="text-center">
      <CardBody>
        <CardTitle tag="h5">TITLE</CardTitle>
      </CardBody>
      <img width="100%" src="https://www.stadium.se/INTERSHOP/static/WFS/Stadium-SwedenB2C-Site/-/Stadium/sv_SE/Guides/Cykling/citybike%20flo%CC%88debild%20.jpg" />
      <CardBody>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
      </CardBody>
    </Card>
    </Col>
)
}

export default AuctionItem 