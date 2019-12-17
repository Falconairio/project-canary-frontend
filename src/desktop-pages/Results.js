import React, { Component } from 'react'

class Results extends Component {
    constructor(props) {
        super(props)
    this.state = {
        players: [],
        scoreboard:[{
            name: 'aaaaaaaaa',
            score: 1000
        }, {
            name: 'Johann',
            score: 10000
        },{
            name: 'Uros',
            score: 300
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        },{
            name: 'Griffith',
            score: 1000
        }]
    }
    }
    endgame = () => {
        this.props.history.push('/home');
    }
    componentDidMount() {
        let sortedbyscore = this.state.scoreboard.sort((a,b) => (a.score < b.score) ? 1 : -1)
        this.setState({scoreboard: sortedbyscore})
    }
    render() {
        return (
            <div className = 'scoreboarddesktop'>
                <h1>Game Results</h1>
                <ol>
                    {this.state.scoreboard
                    ? this.state.scoreboard.slice(0,10).map((player,index) => {
                        return <li className = 'playerresultelement'><strong>{index +1 }. {player.name}:</strong><p>{player.score}</p></li>
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