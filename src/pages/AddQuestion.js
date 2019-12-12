import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

 class AddQuestion extends Component {
    render() {
        return (
            <div className = 'addquestioncontainer'>
                <h1>Add Question</h1>
            </div>
        )
    }
}
export default withAuth(AddQuestion)