import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

class WaitingScreen extends Component {
    state = {
        players: [],
        gamemaster: null,
    }
    componentDidMount() {
        this.setState( {players: this.props.players, gamemaster: this.props.gamemaster} )
    }
    componentDidUpdate(prevprops,prevstate) {
        if(prevprops.players !== this.props.players) {
            this.setState({players: this.props.players})
        }
    }
    render() {
        return (
            <div className = 'waitingscreencontainer'>
                <div className = 'waitingtostartdesktop'>
                    <h1>Waiting to start...</h1>
                    <button onClick = {this.props.toggle}>Start</button>
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
                <p>{this.state.gamemaster}'s Game</p>
            </div>
        )
    }
}
export default withAuth(WaitingScreen)