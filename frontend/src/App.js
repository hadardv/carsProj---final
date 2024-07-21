
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarList from './pages/CarList';
import Leading from './pages/Leading';
  
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CarList" element={<CarList />} />
      <Route path="/Leading" element={<Leading />} />
    </Routes>
  </Router>
  );
};

export default App