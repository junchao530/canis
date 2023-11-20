import logo from "./logo.svg";
import "./App.css";
import WorldMap from "./WorldMap";
import CompanyButtonList from "./button";

function App() {
  return (
    <div className="App">
      <div style={{fontSize: "xxx-large", fontWeight:"bold", color: 'white',}}> World Map</div>
      <a href="https://siemd2-lida-exp-app-qqa1k2.streamlit.app/" 
         style={{ color: '#E2AEFF', fontWeight: 'bold', fontSize: 'large' }}>
         Ask Lida !
      </a>
      <WorldMap />
    </div>
  );
}

export default App;