import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const url = searchParams.get('url');
  console.log("url=" + url);

  return (
    <div className="App">
      <header className="App-header">
        <p>protocol={window.location.protocol}</p>
        <p>host={window.location.host}</p>
        <p>
        pathname={window.location.pathname}
        </p>
        <p>
        params={window.location.search}
        </p>
      </header>
    </div>
  );
}

export default App;
