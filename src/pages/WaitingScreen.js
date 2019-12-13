import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

class WaitingScreen extends Component {
    state = {
        players: this.props.game.players
    }
    render() {
        return (
            <div className = 'waitingscreencontainer'>
                <h1>Waiting to start...</h1>
            </div>
        )
    }
}
export default withAuth(WaitingScreen)