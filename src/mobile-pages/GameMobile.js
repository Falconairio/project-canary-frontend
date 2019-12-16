import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

import WaitingScreenMoblie from '../mobile-pages/WaitingMobile'

class GameMobile extends Component {
    state = {
        waitingtoggle: true,
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {
                    this.state.waitingtoggle
                    ?<WaitingScreenMoblie />
                    :null
                }
            </div>
        )
    }
}
export default withAuth(GameMobile)