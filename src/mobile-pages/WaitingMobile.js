import React, { Component } from 'react'
import { disconnect } from './../api'; 

class WaitingMobile extends Component {
    state = {
        // players: this.props.game.players
        players: ['Griffith','Johann','Pablo','Uros','Stephan','Sam','Jakub','Rem']
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
            </div>
        )
    }
}
export default WaitingMobile
