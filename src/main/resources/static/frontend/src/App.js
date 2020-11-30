import Home from './pages/Home'
import MyPage from './pages/MyPage'
import TradeHubHeader from "./components/tradeHubHeader";
import UserContexProvider from "./context/UserContext"
import TradeHubFooter from "./components/TradeHubFooter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <UserContexProvider>
      <TradeHubHeader /> 
      <main className="container main-content">
       <MyPage/>
      </main>
      <TradeHubFooter />
      </UserContexProvider>
    </div>
  );
}

export default App;
