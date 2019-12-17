import React, { Component } from 'react'
import { sendanswer } from './../api'

export default class QuestionMobile extends Component {
    state = {
        rightanswer: 'yes',
        wronganswer1: 'no',
        wronganswer2: 'maybe',
        wronganswer3: 'possibly',
        answers: [],
        answertoggle: true,
        recievedtoggle: false,
    }
    componentDidMount() {
        let answersarray = [this.state.rightanswer,this.state.wronganswer1,this.state.wronganswer2,this.state.wronganswer3]
        answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray})
    } 
    submitanswer = (event) => {
        event.preventDefault();
        const answer = event.target.value;
        let answerRight;
        if(answer === this.state.rightanswer) {
            answerRight = true;
        } else {
            answerRight = false;
        }
        sendanswer(this.props.questionnumber,answerRight);
        this.setState({answertoggle : false, recievedtoggle: true})
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