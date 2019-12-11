import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Private Route</h1>
        <button onClick={this.props.logout}>Logout</button>
      </div>
      
    );
  }
}

export default withAuth(Private);
