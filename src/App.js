import React from 'react';
import './App.css';
import Home from './pages/Home';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    // <span>I've got a bad feeling about this</span>
    <PlanetsProvider>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
