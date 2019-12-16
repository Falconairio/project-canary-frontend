import React, { Component } from 'react'

export default class QuestionMobile extends Component {

    state = {
        imageUrl: 'https://res.cloudinary.com/dubdb3j5z/image/upload/c_scale,w_338/v1576186499/canary/nctx5dynk6aonqrwtrm7.jpg',
        question: 'Is this question crap?',
        rightanswer: 'yes',
        wronganswer1: 'no',
        wronganswer2: 'maybe',
        wronganswer3: 'possibly',
        answers: [],
    }
    componentDidMount() {
        let answersarray = [this.state.rightanswer,this.state.wronganswer1,this.state.wronganswer2,this.state.wronganswer3]
        answersarray.sort(function() {
            return .5 - Math.random();
          });
        this.setState({answers: answersarray})
    } 

    render() {
        return (
            <div className = 'desktopquestion'>
                <div className = 'questiontop'>
                    <div className = 'questiontitle'>
                        <h1>Question 1</h1>
                        <h2>{this.state.question}</h2>
                    </div>
                    <div className = 'labelwithpreview'>
                        <div style = {{border: '2px solid black',height: '200px', width: '200px', backgroundImage: `url(${this.state.imageUrl})`,backgroundPosition:'center top', backgroundSize:'cover', marginBottom: '10px'}}></div>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}
