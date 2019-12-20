import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

class WaitingScreen extends Component {
    state = {
        players: [],
        gamemaster: null,
        number: 0,
        loadingtoggle: false
    }
    componentDidMount() {
        this.setState( {players: this.props.players, gamemaster: this.props.gamemaster} )
    }
    componentDidUpdate(prevprops,prevstate) {
        if(prevprops.players !== this.props.players) {
            this.setState({players: this.props.players, number: this.props.players.length})
        }
    }
    render() {
        return (
            <div className = 'waitingscreencontainer'>
                <div className = 'waitingheadercontainer'>
                    <div className = 'waitingtostartdesktop'>
                        <h1>Waiting to start...</h1>
                        <button onClick = {this.props.toggle}>Start</button>
                    </div>
                    <div className = 'gameinfocontainer'>
                        <h1>{this.props.game.name} by {this.props.user.username}</h1>
                        <div className = 'numbertext'>
                            <h1 className = 'noplayers'># of players</h1>
                            <h1 className = 'colon'>:</h1>
                            <h1 className = 'number'>{this.state.players.length}</h1>
                        </div>
                    </div>
                </div>
                <div className = 'waitingdesktopbottom'>
                    <div className = 'playerslistdesktopcontainer'>
                        <h1>Players:</h1>
                        <ul className = 'playernames'>
                            {this.state.players.map(player => {
                                return <li>{player}</li>
                            })}
                        </ul>
                    </div>
                    <div className = 'qrcodediv'>
                        <h1>Scan QR Code to join</h1>
                        <img src = {this.props.game.qrCode} alt = '' />
                    </div>
                </div>
            </div>
        )
    }
}
export default withAuth(WaitingScreen)