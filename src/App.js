import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Productos from './components/productos.js'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      
      
      
      <header className="App-header">

        ... no changes in this part ...

        <p>The current time is {currentTime}.</p>
      </header>
      <div>
        conectado con la api!
      </div>
    </div>
  );
}

export default App;