//	lib/AuthProvider.js

import React from 'react';
import authService from './auth-service'; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();



// HOC to create Consumer
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* <Consumer> component provides callback which receives Providers "value" object */}
          {({ login, signup, user, logout, update, me, isLoggedin, deletee }) => {
            return (
              <WrappedComponent
                deleteuser={deletee}
                login={login}
                signup={signup}
                user={user}
                me={me}
                update={update}
                logout={logout}
                isLoggedin={isLoggedin}
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
  state = { isLoggedin: false, user: null, isLoading: true };

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

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, imageUpload, update, me, deletee } = this;
    console.log('this is the props',this.props)
    return (
      <Provider value={{ isLoading, isLoggedin, user, me, login, logout, signup, update, imageUpload, deletee}}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;
