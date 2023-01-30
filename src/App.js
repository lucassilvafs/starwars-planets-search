import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    // <span>I've got a bad feeling about this</span>
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
