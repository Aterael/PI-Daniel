import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import Home from "./components/Home/Home.jsx"
import VideogameCreated from './components/VideogamesCreated';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/videogame" element={<VideogameCreated/>}/>
        <Route exact path="/home/:id" element={<Detail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
