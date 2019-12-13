import React, { Component } from 'react'

export default class EnterName extends Component {
    state = {
        name: '',
        bootcamp: 'other',
        errormessage: '',
    }
    handleFormSubmit = event => {
        event.preventDefault();
        const { name ,bootcamp } = this.state;
        if(name) {
          this.props.addplayer({ name,bootcamp });
          this.props.history.push('/home')
        } else {
          this.setState({errormessage:'Enter a name'})
          }
      };
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    render() {
        const { name, bootcamp } = this.state
        return (
            <div className = 'enternamediv'>
                <div className = 'playerformfields'>
                <h1>Join active game</h1>
                    <div className = 'nameinput'>
                        <label>Enter Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
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
                    <button onClick = {this.handleFormSubmit}>Enter Game</button>
                </div>
            </div>
        )
    }
}
