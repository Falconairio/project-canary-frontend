import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import authService from '../lib/auth-service'

class Signup extends Component {
  state = { username: '', password: '',email:'', photoUrl: '', confirmpassword: '', errormessage: ''};

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    const { username, password, photoUrl,email, confirmpassword, errormessage } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    if(username,password,confirmpassword) {
    if( password === confirmpassword) {
      if(photoUrl) {
        this.props.signup({ username, password, photoUrl,email }); // props.signup is Provided by withAuth() and Context API
        this.props.history.push('/home')
      } else {
        this.setState({errormessage: 'Slow down! Wait for the photo to load'})
      }
    } else {
      this.setState({errormessage: 'Enter the same password for both fields'})
    }
    } else {
      this.setState({errormessage: 'Enter text in all fields if you want to signup'})
    }
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
    const { username, password,email, confirmpassword } = this.state;
    return (
      <div> 
      <h1 className = 'canaryheader'>Project Canary</h1>
      <div className = 'signupform'>
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={this.handleChange}
          />
          <label>Profile Picture:</label>
          <input type='file' 
          name='picture' 
          placeholder="Picture Url" 
          onChange = {this.fileOnchange}
          />

          <button className='buttonn' id = 'signupbutton'>Sign Up</button>
        </form>
        </div>
        <div className = 'rightsidesignup'>
        <label>Preview:</label>
        <div style = {{border: '2px solid black',height: '200px', width: '200px', backgroundImage: `url(${this.state.photoUrl})`,backgroundPosition:'center top', backgroundSize:'cover', marginBottom: '10px'}}></div>
        <p>Already have account?</p>
        <Link to="/">
          {' '}
          <button className = 'buttonn' >Login</button>
        </Link>
        </div>
      </div>
        {
          this.state.errormessage
          ?<h1>{this.state.errormessage}</h1>
          :null
        }
      </div>
    );
  }
}

export default withAuth(Signup);
