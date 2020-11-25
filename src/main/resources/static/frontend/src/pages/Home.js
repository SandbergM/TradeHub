import React from 'react'
import LoginModal from '../components/loginModal'
import { Row } from 'reactstrap';
import AuctionItem from '../components/AuctionItem'
import AuctionList from '../components/AuctionList';
const Home = () => {
return(
    <div>
        <h1 className="text-warning text-center">Auktioner</h1>
     <AuctionList></AuctionList>
    </div>

)
 

}

export default Home;