import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

import { getplayers, desktopconnect } from './../api'

import WaitingScreen from './WaitingScreen'
import QuestionDesktop from './QuestionDesktop'
import Results from './Results'

class Game extends Component {
    state = {
        waitingtoggle: false,
        questiontoggle: false,
        resultstoggle: false,
        question: {},
        results: [],
        players: [],
        gameId: null,
    }
    togglewaiting = event => {
        event.preventDefault();
        this.setState({ waitingtoggle: false })
    }
    componentDidMount() {
        let path = this.props.history.location.pathname;
        let gameId = path.substring(path.indexOf('=') + 1, path.length)
        desktopconnect(this.props.user._id,gameId);
        getplayers((players) => {
            this.setState( { players })
        }, gameId)
        setTimeout(() => {
            this.setState({ questiontoggle: false, waitingtoggle: true})
        }, 600); 
    }
    render() {
        const { question } = this.state
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreen
                        toggle = {this.togglewaiting}
                        players = {this.state.players}
                         />
                    :null
                }
                {
                    this.state.questiontoggle
                    ?<QuestionDesktop
                        question = { {...question} }
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