import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
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
      <h1>Henry Videogames</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
