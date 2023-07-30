import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { City } from './pages/City';

function App() {
  return (
    <div className="fon">
      <div className="fon_front">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/:city" element={ <City /> } />
          <Route path="/*" element={ <Home /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
