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
            question: {},
            results: [],
            players: [],
            gameId: null,
            gamemaster: null,
            that: this
    }
}
    togglewaiting = event => {
        event.preventDefault();
        console.log(this.state.gameId)
        this.props.startgame(this.state.gameId);
        setTimeout(() => {
            this.setState({ waitingtoggle: false, questiontoggle: true })
        }, 2000);
    }
    componentDidMount() {
        let path = this.props.history.location.pathname;
        let gameId = path.substring(path.indexOf('=') + 1, path.length)
        desktopconnect(this.props.user._id, gameId, (question) => {
            this.setState( {question: question.question} )
            console.log(this.state)
        });
        getplayers((players) => {
            this.setState( { players: players.slice(1,players.length), gamemaster: players[0]})

        }, gameId)
        setTimeout(() => {
            this.setState({ questiontoggle: false, waitingtoggle: true})
        }, 600); 
        this.setState({ gameId })
    }
    componentDidUpdate(prevprops,prevstate) {
        if(prevstate.question !== this.state.question) {
            console.log('foo')
        }
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
                    this.state.questiontoggle
                    ?<QuestionDesktop
                        question = {this.state.question}
                        />
                    :null
                }
                {
                    this.state.resultstoggle
                    ?<Results
                        results = { this.state.results }
                        />
                    :
                        null
                }
            </div>
        )
    }
}
export default withAuth(Game)