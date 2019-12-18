import React, { Component } from 'react'

export default class QuestionDesktop extends Component {
    constructor(props) {
        super(props)
        console.log(props.question)
        this.state = {
            question: this.props.question,
            answers: [],
            toggle: true,
            questionnumber: null,
            number: 10
        }
    }
    
    componentDidMount() {
        this.setState({questionnumber: this.props.questionnumber})
        console.log(this.props)
        let answersarray = [this.state.question.rightAnswer,this.state.question.wrongAnswer1,this.state.question.wrongAnswer2,this.state.question.wrongAnswer3]
        answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray})
    } 
    componentDidUpdate(prevprops) {
        if(prevprops.question !== this.props.question && this.props.question) {
            this.setState({question: this.props.question, questionnumber: this.props.questionnumber})
            let answersarray = [this.props.question.rightAnswer,this.props.question.wrongAnswer1,this.props.question.wrongAnswer2,this.props.question.wrongAnswer3]
            answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray, number: 10})
        setInterval(() => {
            if(this.state.number > 0) {
                this.setState({number: this.state.number - 1})
            } 
        }, 1000 );
        }
    }

    render() {
        return (
            <div className = 'desktopquestion'>
                <div className = 'questiontop'>
                    <div className = 'questiontitle'>
                        <h1>Question {this.state.questionnumber}</h1>
                        <h2>{this.state.question.question}</h2>
                    </div>
                    <div className = 'labelwithpreview'>
                        <div style = {{border: '2px solid black',height: '20vw', width: '30vw', backgroundImage: `url(${this.state.question.photoUrl})`,backgroundPosition:'center top', backgroundSize:'cover', marginBottom: '10px'}}></div>
                    </div>
                </div>
                <div className = 'answerbuttonsdesktop'>
                    {
                        this.state.answers
                        ?
                            this.state.answers.map((answer) => {
                                return <button
                                            name = {answer}
                                            value = {answer}
                                            onClick = {this.makeAnswer}
                                            className = 'answerbutton'
                                        >{answer}</button>
                            })
                        : 
                            null
                    }
                </div>
            </div>
        )
    }
}
