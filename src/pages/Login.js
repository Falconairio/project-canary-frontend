import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
    this.props.history.push('/home')
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className = 'logincontainer'>
        <h1>Project Canary</h1>
        <div className = 'loginpage'>
          <div className = 'loginorsignup'>
            <h1>Login</h1>
            <p>or...</p>
            <Link to="/signup">
                {' '}
                <button className = 'buttonn' >Signup</button>{' '}
            </Link>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

           <button id = 'loginbutton'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);


