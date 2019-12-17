import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'
import { connect } from './../api'

import WaitingScreenMoblie from '../mobile-pages/WaitingMobile'
import QuestionMobile from './QuestionMobile'

class GameMobile extends Component {
    state = {
        waitingtoggle: false,
        questiontoggle: false,
        questionnumber: 0,
        question: {},
        results: [],
        players: [],
        gameId: null,
    }

    componentDidMount() {
            let path = this.props.history.location.pathname;
            let gameId = path.substring(path.indexOf('=') + 1, path.length)
            connect(this.props.player._id, gameId, ((question) => {
                this.setState({questiontoggle:true, waitingtoggle: false, question, questionnumber: this.state.questionnumber + 1})
            }));
            this.setState({ questiontoggle: false, waitingtoggle: true, gameId})
    }

    render() {
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreenMoblie
                    gameId = {this.state.gameId} />
                    :null
                }
                {
                    this.state.questiontoggle 
                    ?<QuestionMobile
                        question = {this.state.question}
                        questionnumber = {this.state.questionnumber}
                         />
                    :null
                }
            </div>
        )
    }
}
export default withAuth(GameMobile)