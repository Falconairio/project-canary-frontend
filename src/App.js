import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Home';
import Edit from './pages/Edit';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/" component={Login} />
          {/* <Route exact path = '/signup' component ={Signup} />
          <Route exact path = '/' component ={Login} /> */}
          <PrivateRoute path ="home/editprofile" component={Edit} />
          <PrivateRoute path="/home" component={Private} />
          {/* <Route exact path = '/home' component = {Private} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
