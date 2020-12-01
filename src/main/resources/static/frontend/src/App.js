import Home from "./pages/Home";
import TradeHubHeader from "./components/tradeHubHeader";
import UserContexProvider from "./context/UserContext";
import TradeHubFooter from "./components/TradeHubFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import AuctionDetailsPage from "./pages/AuctionDetailsPage";
import AuctionContextProvider from "./context/AuctionContextProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserContexProvider>
          <AuctionContextProvider>
            <TradeHubHeader />
            <main className="container main-content">
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
            <TradeHubFooter />
          </AuctionContextProvider>
        </UserContexProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
