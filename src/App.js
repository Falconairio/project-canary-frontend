import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './desktop-pages/Signup';
import Login from './desktop-pages/Login';
import Home from './desktop-pages/Home';
import AddQestion from './desktop-pages/AddQuestion';
import CreateGame from './desktop-pages/CreateGame';
import Game from './desktop-pages/Game';
import EnterName from './mobile-pages/EnterName';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import GameMobile from './mobile-pages/GameMobile';
import QuestionDesktop from './desktop-pages/QuestionDesktop';
import Results from './desktop-pages/Results';
import QuestionMobile from './mobile-pages/QuestionMobile';
import ResultMobile from './mobile-pages/ResultMobile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/" component={Login} />
          <AnonRoute exact path = "/entername/:id" component = {EnterName} />
          <AnonRoute exact path = "/game/:id" component = {GameMobile} />
          {/* <Route exact path = '/signup' component ={Signup} />
          <Route exact path = '/' component ={Login} /> */}
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/addquestion" component = {AddQestion} />
          <PrivateRoute exact path= "/creategame" component = {CreateGame} />
          <PrivateRoute path = '/game/desktop/:id' component = {Game} />
          {/* <Route exact path = '/home' component = {Private} /> */}
          {/* <Route exact path = '/questionmobile' component = {QuestionMobile} />
          <Route exact path = '/results' component = {Results} /> */}
          <Route path = '/resultsmobile' component = {ResultMobile} />
        </Switch>
      </div>
    );
  }
}

export default App;
