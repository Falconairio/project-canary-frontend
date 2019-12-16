import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

class WaitingScreen extends Component {
    state = {
        players: this.props.players
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div className = 'waitingscreencontainer'>
                <div className = 'waitingtostartdesktop'>
                    <h1>Waiting to start...</h1>
                    <button>Start</button>
                </div>

                <div className = 'waitingdesktopbottom'>
                    <div className = 'playerslistdesktopcontainer'>
                        <h1>Players</h1>
                        <div className = 'playernames'>
                            {this.state.players.map(player => {
                                return <p>{player}</p>
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