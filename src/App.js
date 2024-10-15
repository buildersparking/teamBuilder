import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import TeamBuilder from './components/TeamBuilder';
import './App.css';

function App() {
  useEffect(() => {
    ReactGA.initialize('9829337711');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <div className="app-container">
      <TeamBuilder />
    </div>
  );
}

export default App;
