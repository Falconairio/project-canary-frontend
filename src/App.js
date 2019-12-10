import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
        </Switch>
      </div>
    );
  }
}

export default App;
