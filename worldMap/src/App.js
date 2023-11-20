import logo from "./logo.svg";
import "./App.css";
import WorldMap from "./WorldMap";
import CompanyButtonList from "./button";

function App() {
  return (
    <div className="App">
      
      <div style={{fontSize: "xxx-large", fontWeight:"bold",  color: 'white',}}> World Map</div>
      <WorldMap />
    </div>
  );
}

export default App;
