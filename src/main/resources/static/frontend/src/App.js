import Home from './pages/Home'
import MyPage from './pages/MyPage'
import TradeHubHeader from "./components/tradeHubHeader";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <TradeHubHeader/>
      <main className="container">
      <MyPage></MyPage>
      </main>
      
      
    </div>
  );
}

export default App;
