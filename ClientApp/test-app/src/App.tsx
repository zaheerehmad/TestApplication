import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from "./navigation/RouterConfig";
import { ProvideAuth } from "./navigation/Auth/ProvideAuth";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">       
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ProvideAuth>
              <BrowserRouter>
                <RouterConfig />
              </BrowserRouter>
            </ProvideAuth>
    </div>
  );
}

export default App;
