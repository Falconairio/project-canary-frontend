import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Edit extends Component {

    componentDidMount() {
        console.log('in component did mount')
    }
    render() {
        return (
            <div className = 'editcontainer'>
                <h1>Edit Profile</h1>
                <button onClick = {this.props.edittoggle} class = 'buttonn'>Submit</button>
            </div>
        )
    }
}
export default withAuth(Edit);