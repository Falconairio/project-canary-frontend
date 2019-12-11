import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Edit extends Component {

    componentDidMount() {
        console.log('in component did mount')
    }
    render() {
        return (
            <div>
                <h1>This worksGBRWGRGRLUBBBFHJBHEBJJHBERJHEJHBEHJRER</h1>
            </div>
        )
    }
}
export default withAuth(Edit);