import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as data from './data/data_de.json'

function App() {
  return (
    <div className="App">
      <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code>
    </div>
  );
}

export default App;
