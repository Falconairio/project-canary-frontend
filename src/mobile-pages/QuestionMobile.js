import React, { Component } from 'react'
import { sendanswer } from './../api'

export default class QuestionMobile extends Component {
    state = {
        question: this.props.question,
        answers: [],
        answertoggle: true,
        recievedtoggle: false,
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
        if(answer === this.state.question.rightanswer) {
            answerRight = true;
        } else {
            answerRight = false;
        }
        sendanswer(this.props.questionnumber,answerRight);
        this.setState({answertoggle : false, recievedtoggle: true})
    }
    
    componentDidUpdate(prevprops) {
        if(prevprops.question !== this.props.question) {
            this.setState({question: this.props.question, questionnumber: this.props.questionnumber})
            let answersarray = [this.state.question.rightAnswer,this.state.question.wrongAnswer1,this.state.question.wrongAnswer2,this.state.question.wrongAnswer3]
            answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray})
        }
    }

    render() {
        return (
            <div className = 'questionmobile'>
                {this.state.answertoggle
                    ?
                        this.state.answers.map((answer) => {
                            return <button className = 'answermobilebutton' value = {answer} onClick = {this.submitanswer}>{answer}</button>
                        })
                    :
                        null
                }
                {this.state.recievedtoggle
                    ?
                        <h1>Answer Recieved</h1>
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