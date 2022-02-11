import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Search from './components/Search/Search';
import Creation from './components/Creation/Creation';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/videogame/:id" element={<Details />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/create" element={<Creation />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
