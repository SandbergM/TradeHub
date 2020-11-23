import React from 'react'
import { Row } from 'reactstrap';
import AuctionItem from '../components/AuctionItem'
const Home = () => {

    return(
<div>
 <h1>TradeHub Inc</h1>
 <Row>
 <AuctionItem></AuctionItem>
 <AuctionItem></AuctionItem>
 <AuctionItem></AuctionItem>
 </Row>
 
 </div>
    ) 

}

export default Home;