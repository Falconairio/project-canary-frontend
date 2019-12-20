import React, { Component } from 'react'
import { sendanswer } from './../api'

export default class QuestionMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            answers: [],
            answertoggle: true,
            recievedtoggle: false,
            right: null
        }
    }

    componentDidMount() {
        let answersarray = [this.state.question.rightAnswer,this.state.question.wrongAnswer1,this.state.question.wrongAnswer2,this.state.question.wrongAnswer3]
        answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray})
    } 
    submitanswer = (event) => {
        event.preventDefault();
        const answer = event.target.value;
        let answerRight;
        if(answer === this.state.question.rightAnswer) {
            answerRight = true;
            this.setState({right: 'right'})
        } else {
            answerRight = false;
            this.setState({right: 'wrong'})
        }
        sendanswer(this.props.questionnumber - 1,answerRight);
        this.setState({answertoggle : false, recievedtoggle: true})
    }
    
    componentDidUpdate(prevprops) {
        if(prevprops.question !== this.props.question && this.props.question) {
            this.setState({question: this.props.question, questionnumber: this.props.questionnumber})
            let answersarray = [this.props.question.rightAnswer,this.props.question.wrongAnswer1,this.props.question.wrongAnswer2,this.props.question.wrongAnswer3]
            answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray, recievedtoggle: false, answertoggle: true})
        }
    }

    render() {
        return (
            <div className = 'questionmobile'>
            <h1>{this.state.question.question}</h1>
                {this.state.answertoggle
                    ?
                        <div>
                            {this.state.answers.map((answer) => {
                                return <button className = 'answermobilebutton' value = {answer} onClick = {this.submitanswer}>{answer}</button>
                            })}
                        </div>
                    :
                        null
                }
                {this.state.recievedtoggle
                    ?
                        <div>
                            <h1>Answer Sent</h1>
                            <h1>You got that answer {this.state.right}</h1>
                        </div>
                    :
                        null
                    }
            </div>
        )
    }
}
        // rightanswer: '',
        // wronganswer1: '',
        // wronganswer2: '',
        // wronganswer3: '',
        // answers: [],