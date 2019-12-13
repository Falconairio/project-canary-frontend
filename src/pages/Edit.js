import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';
// import { Link } from 'react-router-dom';
import authService from '../lib/auth-service'
import { withRouter } from 'react-router';

class Edit extends Component {
    state = { username: '', email:'', oldpassword: '', photoUrl: '', password: '',confirmpassword: '', errormessage: '', toggleedit:this.props.toggledit, history: this.props.history}
    componentDidMount() {
        console.log('in component did mount')
        console.log(this.props)
    }
    handleFormSubmit = event => {
        event.preventDefault();
        const { username, email, oldpassword, photoUrl, password, confirmpassword, errormessage } = this.state;
        const thingsobj = { username, email, oldpassword, photoUrl, password, confirmpassword, errormessage }
        const thingkeys = Object.keys(thingsobj)
        const thingvalues = Object.values(thingsobj)
        const updated = {}
        for(let i = 0; i < thingkeys.length; i++) {
            if(thingvalues[i] !== "") {
                updated[thingkeys[i]] = thingvalues[i]
            }
        }
        if( password === confirmpassword) {
            this.props.update(updated); // props.signup is Provided by withAuth() and Context API
        } else {
          this.setState({errormessage: 'Enter the same password for both fields'})
        }
        //this.props.edittoggle(event);
        this.props.history.push('/home')
      };
        handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
      fileOnchange = (event) => {    
        const file = event.target.files[0];
        const uploadData = new FormData()
        uploadData.append('photo', file)
    
        authService.changeImage(uploadData)
        .then((photoUrl) => {
          this.setState({photoUrl})
        })
        .catch((error) => console.log(error))
      }
    
    render() {
        const { username, email, oldpassword, password, confirmpassword } = this.state;
        return (
            <div className = 'editcontainer'>
                <div className = 'editformwithlabel'>
                <h1>Edit Profile</h1>
                <form>
                    <div className = 'inputrows'>
                        <div className = 'inputcolumn'>
                            <label>New Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={this.handleChange}
                                />

                            <label>New Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            <label>New Profile Picture:</label>
                                <input type='file' 
                                name='picture' 
                                placeholder="Picture Url" 
                                onChange = {this.fileOnchange}
                                />
                            </div>
                            <div className = 'inputcolumn'>
                            <label>Old Password:</label>
                                <input
                                    type="password"
                                    name="oldpassword"
                                    value={oldpassword}
                                    onChange={this.handleChange}
                                />
                            <label>New Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            <label>Confirm New Password:</label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    value={confirmpassword}
                                    onChange={this.handleChange}
                                />
                        </div>
                    </div>
                    <button className = 'buttonn' onClick = {this.handleFormSubmit}>Submit</button>
                </form>
                </div>
                <div className = 'previewandicon'>
                <div className = 'labelwithpreview'>
                <label>Preview:</label>
                    <div style = {{border: '2px solid black',height: '200px', width: '200px', backgroundImage: `url(${this.state.photoUrl})`,backgroundPosition:'center top', backgroundSize:'cover', marginBottom: '10px'}}></div>
                </div>
                <a onClick = {this.props.edittoggle} href = ''>
                    <img src={require('./../images/corner-up-left.svg')} alt='' />
                </a>
                </div>
            </div>
        )
    }
}
export default withRouter(withAuth(Edit));