import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

class WaitingScreen extends Component {
    state = {
        players: this.props.game.players
    }
    render() {
        return (
            <div className = 'waitingscreencontainer'>
                <div>
                    <h1>Waiting to start...</h1>
                    <button>Start</button>
                </div>

                <div>
                    <div>
                        <h1>Players</h1>
                        <div className = 'playernames'>
                            {this.state.players.map(player => {
                                return <p>{player.name}</p>
                            })}
                        </div>
                    </div>
                    <div className = 'qrcodediv'>
                        <h1>Scan QR Code to join</h1>
                        <img src = {this.props.game.qrCode} />
                    </div>
                </div>
                
            </div>
        )
    }
}
export default withAuth(WaitingScreen)