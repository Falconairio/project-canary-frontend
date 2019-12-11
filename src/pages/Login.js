import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '', errormessage: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, errormessage } = this.state;
    if(username && password) {
      this.props.login({ username, password });
      this.props.history.push('/home')
    } else {
      this.setState({errormessage:'Enter text in all fields'})
      }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, errormessage } = this.state;

    return (
      <div className = 'logincontainer'>
        <h1 className = 'canaryheader'>Project Canary</h1>
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
        {
          this.state.errormessage
          ?<p>{this.state.errormessage}</p>
          :null
        }
      </div>
    );
  }
}

export default withAuth(Login);


