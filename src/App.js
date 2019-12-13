import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './desktop-pages/Signup';
import Login from './desktop-pages/Login';
import Home from './desktop-pages/Home';
import AddQestion from './desktop-pages/AddQuestion';
import CreateGame from './desktop-pages/CreateGame';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import Game from './desktop-pages/Game';
import EnterName from './mobile-pages/EnterName';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/" component={Login} />
          <AnonRoute exact path = "/addplayer" component = {EnterName} />
          {/* <Route exact path = '/signup' component ={Signup} />
          <Route exact path = '/' component ={Login} /> */}
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/addquestion" component = {AddQestion} />
          <PrivateRoute exact path= "/creategame" component = {CreateGame} />
          <PrivateRoute path = '/game/:gameid' component = {Game} />
          {/* <Route exact path = '/home' component = {Private} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
