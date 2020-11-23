import React from 'react'
import { Row } from 'reactstrap';
import AuctionItem from '../components/AuctionItem'
import AuctionList from '../components/AuctionList';
const Home = () => {

    return(
<div>
 <h1>TradeHub Inc</h1>
 <AuctionList></AuctionList>
 </div>
    ) 

}

export default Home;