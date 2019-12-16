import React, { Component } from 'react'

class Results extends Component {
    state = {
        players: [],
        scoreboard:[{
            name: 'Griffith',
            score: 1000
        }, {
            name: 'Johann',
            score: 10000
        }]
    }
    endgame = () => {
        this.props.history.push('/home');
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className = 'scoreboarddesktop'>
                <h1>Game Results</h1>
                <ol>
                    {this.state.scoreboard
                    ? this.state.scoreboard.map((player) => {
                        return <li className = 'playerresultelement'><strong>{player.name}:</strong><p>{player.score}</p></li>
                    })
                    : 
                        null
                    }
                </ol>
                <button className = 'scoreboardbutton' onClick = {this.endgame}>End Game</button>
            </div>
        )
    }
}
export default Results