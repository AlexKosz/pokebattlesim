
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamBuilder from './components/TeamBuilder';
import Home from './components/Home';
import Battle from './components/Battle';

function App() {



  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/teamBuilder">
            <TeamBuilder />
          </Route>
          <Route path="/battle">
            <Battle />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
