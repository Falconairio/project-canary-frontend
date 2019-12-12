import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'
import authService from '../lib/auth-service'

 class AddQuestion extends Component {
    state = {questionType:'', rightAnswer:'', wrongAnswer1:'',wrongAnswer2:'',wrongAnswer3:'',photoUrl:''}

    fileOnchange = (event) => {    
        const file = event.target.files[0];
        const uploadData = new FormData();
        uploadData.append('photo', file);
    
        authService.imageUpload(uploadData)
        .then((photoUrl) => {
          this.setState({photoUrl})
        })
        .catch((error) => console.log(error))
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    handleSubmit = e => {
        e.preventDefault();
        const newQuestion = this.state;
        console.log(newQuestion);
        this.props.addQuestion(newQuestion);




    }

    render() {
        const {questionType, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3,photoUrl} = this.state;
        return (
            <section className = 'addquestioncontainer'>
                <h1>Add Question</h1>
                <label>Question Type</label>
                <select name="questionType" value={questionType} onChange={this.handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="webdev">Webdev</option>
                    <option value="uxdesign">UX Design</option>
                    <option value="data">Data Analytics</option>                
                </select>
                <label>Question Image</label>                
                <input type='file' 
                    name='picture' 
                    placeholder="Picture Url" 
                    onChange = {this.fileOnchange}
                />
                <label>Preview:</label>
                <div style = {{border: '2px solid black',height: '200px', width: '200px',       backgroundImage: `url(${photoUrl})`,backgroundPosition:'center top', backgroundSize:'cover', marginBottom: '10px'}}></div>
                <label>Right Answer</label>
                <input type='text' name='rightAnswer' value={rightAnswer} onChange={this.handleChange}/>

                <label>Wrong Answer 1</label>
                <input type='text' name='wrongAnswer1' value={wrongAnswer1} onChange={this.handleChange}/>

                <label>Wrong Answer 2</label>
                <input type='text' name='wrongAnswer2' value={wrongAnswer2} onChange={this.handleChange} />

                <label>Wrong Answer 3</label>
                <input type='text' name='wrongAnswer3' value={wrongAnswer3} onChange={this.handleChange}/>

                <button onClick={this.handleSubmit}>Submit</button>
                
            </section>
        )
    }
}
export default withAuth(AddQuestion)