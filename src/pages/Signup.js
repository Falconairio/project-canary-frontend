import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { parser } from '../config/cloudinary';
import authService from '../lib/auth-service'

class Signup extends Component {
  state = { username: '', password: '', photoUrl: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    const { username, password, photoUrl } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, password, photoUrl }); // props.signup is Provided by withAuth() and Context API
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  fileOnchange = (event) => {    
    console.log(this.props)
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    authService.imageUpload(uploadData)
    .then((photoUrl) => {
      console.log(photoUrl)
      this.setState({photoUrl})
    })
    .catch((error) => console.log(error))
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className = 'signupform'>
        <h1>Sign Up</h1>
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
          <input type='file' name='picture' placeholder="Picture Url" onChange = {this.fileOnchange}/>

          <input type="submit" value="Signup" className = 'buttonn'/>
        </form>

        <p>Already have account?</p>
        <Link to="/login">
                {' '}
                <button className = 'buttonn' >Login</button>
            </Link>
      </div>
    );
  }
}

export default withAuth(Signup);
