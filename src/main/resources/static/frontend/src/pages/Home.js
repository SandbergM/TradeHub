import React from 'react'
import LoginModal from '../components/loginModal'
import { Row } from 'reactstrap';
import AuctionItem from '../components/AuctionItem'
import AuctionList from '../components/AuctionList';
import ImageUpload from '../components/ImageUpload';
const Home = () => {
return(
    <div>
        <h1 className="text-warning text-center">Auktioner</h1>
     <ImageUpload/>
     <AuctionList></AuctionList>
    </div>

)
 

}

export default Home;