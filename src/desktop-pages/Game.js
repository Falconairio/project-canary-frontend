import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

import { getplayers, desktopconnect } from './../api'

import WaitingScreen from './WaitingScreen'
import QuestionDesktop from './QuestionDesktop'
import Results from './Results'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingtoggle: false,
            questiontoggle: false,
            resultstoggle: false,
            loadingtoggle: false,
            question: {},
            results: [],
            players: [],
            gameId: null,
            gamemaster: null,
            questionnumber: 0,
    }
}
    togglewaiting = event => {
        event.preventDefault();
        this.setState({waitingtoggle: false, loadingtoggle: true})
        this.props.startgame(this.state.gameId);
        setTimeout(() => {
            this.setState({ loadingtoggle: false, questiontoggle: true })
        }, 2000);
    }
    componentDidMount() {
        let path = this.props.history.location.pathname;
        let gameId = path.substring(path.indexOf('=') + 1, path.length)
        desktopconnect(this.props.user._id, gameId, (question) => {
            this.setState( {question: question.question, questionnumber: this.state.questionnumber + 1} )
        }, (players) => {
            this.setState( {players: players.slice(1,players.length), gamemaster: players[0]} )
        }, (results) => {
            this.setState( { questiontoggle: false, resultstoggle: true, results: results } )
        });
        getplayers((players) => {
            this.setState( { players: players.slice(1,players.length), gamemaster: players[0]})
        }, gameId)
        setTimeout(() => {
            this.setState({ questiontoggle: false, waitingtoggle: true})
        }, 600); 
        this.setState({ gameId })
    }
    render() {
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreen
                        toggle = {this.togglewaiting}
                        players = {this.state.players}
                        gamemaster = {this.state.gamemaster}
                         />
                    :null
                }
                {
                    this.state.loadingtoggle
                    ?<h1>Loading...</h1>
                    :null
                }
                {
                    this.state.questiontoggle
                    ?<QuestionDesktop
                        question = {this.state.question}
                        questionnumber = {this.state.questionnumber}
                        />
                    :null
                }
                {
                    this.state.resultstoggle
                    ?<Results
                        players = {this.state.results}
                        gameId = {this.state.gameId}
                        endgame = {this.props.endgame}
                        />
                    :
                        null
                }
            </div>
        )
    }
}
export default withAuth(Game)