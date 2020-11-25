import Home from './pages/Home'
import TradeHubHeader from "./components/tradeHubHeader";
import TradeHubFooter from "./components/TradeHubFooter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <TradeHubHeader />
      
      <main className="container">
        <Home />
      </main>

      <TradeHubFooter />
    </div>
  );
}

export default App;
