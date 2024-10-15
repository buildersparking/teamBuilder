import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import TeamBuilder from './components/TeamBuilder';
import './App.css';

function App() {
  useEffect(() => {
    console.log("Début de l'initialisation de Google Analytics");
    ReactGA.initialize('9829337711');
    console.log("Google Analytics initialisé avec l'ID : 9829337711");
    
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    console.log("Pageview envoyé pour : " + window.location.pathname);
    
    console.log("Fin de l'initialisation de Google Analytics");
  }, []);

  return (
    <div className="app-container">
      <TeamBuilder />
    </div>
  );
}

export default App;
