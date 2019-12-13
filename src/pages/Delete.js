import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';

class Delete extends Component {
    render() {
        return (
            <div className = 'deletecontainer'>
                <h1>Are you sure you want to delete your profile?</h1>
                <div className = 'deletebuttons'>
                    <button className = 'buttonn' onClick = {this.props.deleteuser}>Delete it!</button>
                    <button className = 'buttonn' onClick = {this.props.deletetoggle}>No, go back</button>
                </div>
            </div>
        )
    }
}

export default withAuth(Delete)
