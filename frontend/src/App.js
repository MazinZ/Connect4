import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Connect4 from './Components/Connect4/Connect4';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/spectate/:id/" component={Connect4} />
      <Route exact path="/" component={Connect4} />
    </Switch>
  </div>
);

export default App;
