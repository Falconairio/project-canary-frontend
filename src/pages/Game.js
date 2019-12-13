import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

import WaitingScreen from './WaitingScreen'

class Game extends Component {
    state = {
        waitingtoggle: true,
    }
    render() {
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreen />
                    :null
                }
            </div>
        )
    }
}
export default withAuth(Game)