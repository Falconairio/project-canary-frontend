import React, { Component } from 'react'
import { thisExpression } from '@babel/types';
import { withAuth } from '../lib/AuthProvider';


class EnterName extends Component {
    state = {
        username: '',
        bootcamp: 'other',
        errormessage: '',
        toggle: true,
    }
    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({toggle: false})
        const { username ,bootcamp } = this.state;
        if(username) {
        let path = this.props.history.location.pathname;
        let gameId = path.substring(path.indexOf('=') + 1, path.length)
        this.props.addplayer({ username,bootcamp, gameId });
        setTimeout(() => {
            this.props.history.push(`/game/id=${gameId}`)
        } ,3000)
        } else {
          this.setState({errormessage:'Enter a name'})
          }
      };
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    render() {
        const { username, bootcamp } = this.state
        return (
            <div>
            {this.state.toggle
            ?<div className = 'enternamediv'>
                <div className = 'playerformfields'>
                <h1>Join active game</h1>
                    <div className = 'nameinput'>
                        <label>Enter Name:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className = 'selectbootcamp'>
                        <label>Select Bootcamp:</label>
                        <select name="bootcamp" value={bootcamp} onChange={this.handleChange} className='multiselect'>
                            <option value= "other">other</option>
                            <option value="webdev">Webdev</option>
                            <option value="ux">UI/UX</option>
                            <option value="data">Data Analysis</option>
                        </select>
                    </div>
                </div>
                <div className = 'enterbutton'>
                    {
                    this.state.errormessage
                    ?<p>{this.state.errormessage}</p>
                    :null
                    }
                    <button onClick = {this.handleFormSubmit}>Enter Game</button>
                    </div>
                </div>
            : <h1>Wait...</h1>
            }
            </div>
        )
    }
}

export default withAuth(EnterName)


