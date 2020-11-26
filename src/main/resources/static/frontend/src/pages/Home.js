import React from 'react'
import LoginModal from '../components/loginModal'
import { Row } from 'reactstrap';
import AuctionItem from '../components/AuctionItem'
import AuctionList from '../components/AuctionList';
import RegisterNewAuction from '../components/RegisterNewAuction';
const Home = () => {
return(
    <div className="row">
        <h1 className="text-warning text-center col-12">Auktioner</h1>
        <div  className="col-12">
        <RegisterNewAuction />
        </div>
        <AuctionList className="col-12"></AuctionList>
    </div>

)
 
}

export default Home;