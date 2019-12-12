import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider';

class CreateGame extends Component {
    state = {
        numberofquestions: 5,
        webdevcheck: false,
        datanylcheck: false,
        uxcheck: false,
        name: ''
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
      handleFormSubmit = event => {
        event.preventDefault();
        const { numberofquestions, webdevcheck, datanylcheck, uxcheck, name } = this.state;
        if(webdevcheck !== false && datanylcheck !== false && uxcheck !== false) {
            if(numberofquestions, name) {
                this.props.creategame({ numberofquestions, webdevcheck, datanylcheck, uxcheck, name });
                this.props.history.push('/home')
            } else {
            this.setState({errormessage:'Enter a name'})
            }
        } else {
            this.setState({errormessage:'Select at least one question type'})
        }
      };
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
                <h1>Create Game</h1>
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
                            <option value= "5">5</option>
                            <option value="10">10</option>
                            <option value="20">15</option>
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
                    <button className='buttonn' id = 'creategamebutton' onClick = {this.handleFormSubmit}>Create Game</button>
                </form>
            </div>
        )
    }
}
export default withAuth(CreateGame)