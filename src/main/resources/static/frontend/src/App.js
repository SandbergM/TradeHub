// DEPENDENCIES
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// PAGES
import AuctionDetailsPage from "./pages/AuctionDetailsPage";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import PageNotFound from "./pages/PageNotFound";

// CONTEXTS
import UserContexProvider from "./context/UserContext";
import AuctionContextProvider from "./context/AuctionContextProvider";
import ChatContextProvider from "./context/ChatContext";
import SocketContextProvider from "./context/SocketContext";

//COMPONENTS
import TradeHubHeader from "./components/HomeComponents/TradeHubHeader";
import TradeHubFooter from "./components/HomeComponents/TradeHubFooter";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ChatContextProvider>
          <UserContexProvider>
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
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </main>
                <TradeHubFooter />
              </SocketContextProvider>
            </AuctionContextProvider>
          </UserContexProvider>
        </ChatContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
