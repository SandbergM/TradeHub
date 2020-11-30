import Home from './pages/Home'
import TradeHubHeader from "./components/tradeHubHeader";
import UserContexProvider from "./context/UserContext"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <UserContexProvider/>
      <TradeHubHeader/>
      <main className="container">
        <Home />
      </main>
    </div>
  );
}

export default App;
