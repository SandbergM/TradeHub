import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import TradeHubHeader from "./components/TradeHubHeader";
import UserContexProvider from "./context/UserContext";
import TradeHubFooter from "./components/TradeHubFooter";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AuctionDetailsPage from "./pages/AuctionDetailsPage";
import AuctionContextProvider from "./context/AuctionContextProvider";
import ChatContextProvider from "./context/ChatContext";
import SocketContextProvider from "./context/SocketContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserContexProvider>
          <ChatContextProvider>
            <AuctionContextProvider>
              <SocketContextProvider>
                <TradeHubHeader />
                <main className="container main-content">
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/auction/:title/:id">
                      <AuctionDetailsPage />
                    </Route>
                    <Route exact path="/mypage" component={MyPage} />
                  </Switch>
                </main>
                <TradeHubFooter />
              </SocketContextProvider>
            </AuctionContextProvider>
          </ChatContextProvider>
        </UserContexProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
