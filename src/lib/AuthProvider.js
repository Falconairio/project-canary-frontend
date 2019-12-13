//	lib/AuthProvider.js

import React from 'react';
import { withRouter } from 'react-router';
import authService from './auth-service'; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();



// HOC to create Consumer
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* <Consumer> component provides callback which receives Providers "value" object */}
          {({ login, signup, user, logout, update, me, isLoggedin, deletee, addQuestion, game, creategame }) => {
            return (
              <WrappedComponent
                creategame={creategame}
                deleteuser={deletee}
                login={login}
                signup={signup}
                user={user}
                me={me}
                update={update}
                logout={logout}
                isLoggedin={isLoggedin}
                addQuestion={addQuestion}
                game = {game}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true, game: null };

  componentDidMount() {
    authService
      .me()
      .then(user =>
        this.setState({ isLoggedin: true, user: user, isLoading: false }),
      )
      .catch(err =>
        this.setState({ isLoggedin: false, user: null, isLoading: false }),
      );
  }

  signup = user => {
    console.log(user)
    const { username, password, photoUrl, email } = user;

    authService
      .signup({ username, password, photoUrl, email })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
    };
    update = user => {
    console.log('in authprovider update', user)
    const { username, email, oldpassword, password, photoUrl } = user;
    authService
    .update({ username, email, oldpassword, password, photoUrl })
      .then(user => this.setState({user}))
      .catch(err => console.log(err));
    }
    addQuestion = newQuestion => {
      authService
        .addQuestion(newQuestion)
        .then()
    }
    
    login = user => {
    const { email, password } = user;

    authService
      .login({ email, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  };
  deletee = () => {
    authService
      .delete()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  }
  me = () => {
    authService
      .me()
      .then((user) => this.setState({user:user}))
      .catch(err => console.log(err));
  }
  creategame = (data) => {
    const { numberofquestions, webdevcheck, datanylcheck, uxcheck, name } = data
    authService
      .creategame({ numberofquestions, webdevcheck, datanylcheck, uxcheck, name })
        .then( (datae) => {
          console.log('this is the data in authprovider',datae.data)
          this.setState({game: datae.data})
        })
        .catch( (err) => console.log(err));
        
  }


  render() {
    const { isLoading, isLoggedin, user, game } = this.state;
    const { login, logout, signup, imageUpload, update, me, deletee, addQuestion, creategame } = this;
    return (
      <Provider value={{ isLoading, isLoggedin, user, me, login, logout, signup, update, imageUpload, deletee, addQuestion,game,creategame}}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default withRouter(AuthProvider);