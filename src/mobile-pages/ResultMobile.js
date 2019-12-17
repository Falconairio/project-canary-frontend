import React, { Component } from 'react'

export default class ResultMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playerdata: this.props.player
            // playerdata: {
            //     name: 'Griffith',
            //     score: 5000
            // }
        }
    }
    render() {
        return (
            <div className = 'resultsmobile'>
                <div className = 'resultsmobileheader'>
                    <h1>{this.state.playerdata.name},</h1>
                    <p>your score was:</p>
                </div>
                <p className = 'resultsmobilescore'>{this.state.playerdata.score}</p>
            </div>
        )
    }
}
