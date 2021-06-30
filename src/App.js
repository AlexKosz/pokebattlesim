
import './App.css';

import React from 'react';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamBuilder from './components/TeamBuilder';
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
            <h1>Test</h1>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
