import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'
import { connect } from './../api'

import WaitingScreenMoblie from '../mobile-pages/WaitingMobile'
import QuestionMobile from './QuestionMobile'
import ResultMobile from './ResultMobile'

class GameMobile extends Component {
    state = {
        waitingtoggle: false,
        questiontoggle: false,
        resulttoggle: false,
        questionnumber: 0,
        question: {},
        results: null,
        players: [],
        gameId: null,
    }
    componentDidMount() {
            let path = this.props.history.location.pathname;
            let gameId = path.substring(path.indexOf('=') + 1, path.length)
            connect(this.props.player._id, gameId, ((question) => {
                this.setState({questiontoggle:true, waitingtoggle: false, question: question.question, questionnumber: this.state.questionnumber + 1})
            }), ((results) => {
                var result = results.find(obj => {
                    return obj.username === this.props.player.username
                  })
                this.setState( { waitingtoggle: false, questiontoggle: false, resulttoggle: true, results: result } )
            }),(players) => {
                this.setState( {players: players.slice(1,players.length), gamemaster: players[0]} )
            }
            );
            this.setState({ questiontoggle: false, waitingtoggle: true, gameId})
    }
    render() {
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreenMoblie
                    players = {this.state.players}
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
                {
                    this.state.resulttoggle
                    ?<ResultMobile 
                        player = {this.state.results}
                        />
                    :
                        null
                }
            </div>
        )
    }
}
export default withAuth(GameMobile)