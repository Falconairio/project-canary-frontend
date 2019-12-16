import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class CreateGame extends Component {
    state = {
        numberofquestions: 6,
        webdevcheck: false,
        datanylcheck: false,
        uxcheck: false,
        name: '',
        errormessage: ''
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
      handleFormSubmit = event => {
          console.log(this.state)
        event.preventDefault();
        const { numberofquestions, webdevcheck, datanylcheck, uxcheck, name } = this.state;
        if(webdevcheck === true || datanylcheck === true || uxcheck === true) {
            if(numberofquestions,name) {
                this.props.creategame({ numberofquestions, webdevcheck, datanylcheck, uxcheck, name })
                this.setState({errormessage: 'Game Created! Press Start'})
            } else {
            this.setState({errormessage:'Enter a name'})
            }
        } else {
            this.setState({errormessage:'Select at least one question type'})
        }
      }
      startGame = event => {
        event.preventDefault();
          if(this.props.game) {
             this.props.history.push(`/game/desktop/id=${this.props.game._id}`)
            //this.props.history.push(`/addquestion`)
            console.log('this is the game',this.props.game)
          } else {
              this.setState({errormessage: 'Game has not been created'})
          }
      }
      multiselect = event => {
        const { value } = event.target;
        this.setState({ numberofquestions: value });
      }
      checkBox = event => {
        const opposite = this.state[event.target.name]
        this.setState({[event.target.name]: !opposite})
      }
    render() {
        const {numberofquestions, webdevcheck, datanylcheck, uxcheck, name} = this.state
        return (
            <div className = 'addgamecontainer'>
                <div className = 'creategameheader'>
                    <h1>Create Game</h1>
                    <Link to='/home'>
                        <img src={require('./../images/corner-up-left.svg')} alt='' />
                    </Link>
                </div>
                <form>
                <label>Game Title:</label>
                    <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    /> 
                    <div className = 'noquestions'>
                        <label>Number of Questions:</label>
                        <select name="questionType" value={numberofquestions} onChange={this.multiselect} className='multiselect'>
                            <option value= "6">6</option>
                            <option value="12">12</option>
                            <option value="18">18</option>
                        </select>
                    </div>
                    <div className = 'checkboxdiv'>
                        <label>Types of questions included:</label>
                        <label>WebDev</label>
                        <input 
                        type = 'checkbox'
                        name = 'webdevcheck'
                        onChange = {this.checkBox}
                        checked = {webdevcheck}
                            />
                        <label>Data Analysis</label>
                        <input 
                        type = 'checkbox'
                        name = 'datanylcheck'
                        onChange = {this.checkBox}
                        checked = {datanylcheck}
                            />
                        <label>UI/UX</label>
                        <input 
                        type = 'checkbox'
                        name = 'uxcheck'
                        checked = {uxcheck}
                        onChange = {this.checkBox}
                            />
                    </div>
                    <div className = 'createandstartbuttons'>
                        <button className='buttonn' onClick = {this.handleFormSubmit}>Create Game</button>
                        <button className='buttonn' onClick = {this.startGame}>Start Game</button>
                    </div>
                </form>
                {
                    this.state.errormessage
                    ?<p>{this.state.errormessage}</p>
                    :null
                }
            </div>
        )
    }
}
export default withAuth(CreateGame)