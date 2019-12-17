import React, { Component } from 'react'
import { disconnect, getplayers } from './../api'; 
import { withAuth } from '../lib/AuthProvider';

class WaitingMobile extends Component {
    state = {
        // players: this.props.game.players
        players: []
        
    }
    quitgame = () => {
        disconnect();
        this.setState({players: 'You have been disconnected'})
    }
    componentDidMount = () => {
        getplayers((players) => {
            this.setState( { players: players.slice(1,players.length), gamemaster: players[0]})
        }, this.props.gameId)
    }
    componentDidUpdate = (prevprops,prevstate) => {
        if(prevprops.players !== this.state.players) {
            this.setState({players: this.props.players})
        }
    }
    render() {
        return (
            <div className = 'waitingmobilediv'>
                <h1>Waiting to start...</h1>
                <div className = 'playerslist'>
                    <h2>Current Players:</h2>
                    <ul className = 'playersmobile'>
                        {
                            this.state.players
                        ?
                            this.state.players.map((player) => {
                                return <li>{player}</li>
                            })
                        :
                            null
                        }
                    </ul>
                </div>
                <button className = 'buttonn' onClick = {this.quitgame}>Quit</button>
            </div>
        )
    }
}
export default withAuth(WaitingMobile)
