import Home from './pages/Home'
import TradeHubHeader from "./components/tradeHubHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import AuctionDetailsPage from './components/auctionDetailsPage';
import  AuctionContextProvider from './context/AuctionContextProvider';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuctionContextProvider>
          <TradeHubHeader />
          <main className="container">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/auction/:title/:id">
                  <AuctionDetailsPage />
                </Route>
              </Switch>
            </Router>
          </main>
        </AuctionContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
