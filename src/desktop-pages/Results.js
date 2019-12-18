import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Results extends Component {
    constructor(props) {
        super(props)
    this.state = {
        scoreboard:[]
    }
    }
    endgame = () => {
        this.props.endgame(this.props.gameId)
    }
    componentDidMount() {
        let sortedbyscore = this.props.players.sort((a,b) => (a.score < b.score) ? 1 : -1)
        this.setState({scoreboard: sortedbyscore})
    }
    render() {
        return (
            <div className = 'scoreboarddesktop'>
                <h1>Game Results</h1>
                <ol>
                    {this.state.scoreboard
                    ? this.state.scoreboard.slice(0,10).map((player,index) => {
                        return <li className = 'playerresultelement'><strong>{index +1 }. {player.username}:</strong><p>{player.score}</p></li>
                    })
                    : 
                        null
                    }
                </ol>
                <Link to="/home">
                    {' '}
                    <button className = 'scoreboardbutton' onClick = {this.endgame}>End Game</button>
                </Link>
                
            </div>
        )
    }
}
export default Results