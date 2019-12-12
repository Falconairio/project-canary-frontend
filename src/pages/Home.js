import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import Delete from './Delete';

class Home extends Component {
  state = {
    Rank: 'Noob',
    edittoggle: false,
    deletetoggle: false,
  }

  toggleedit = (event) => {
    event.preventDefault();
    let toggle = !this.state.edittoggle;
    this.setState({edittoggle: toggle});
    this.props.me();
    // if(toggle === false) {
    //   this.props.history.push('/home')
    // }
  }

  toggledelete = (event) => {
    event.preventDefault()
    let toggle = !this.state.deletetoggle;
    this.setState({deletetoggle:toggle});
  }

  componentDidMount() {
    if(this.props.user.gamesWon >= 5) {
      this.setState({Rank: 'Experienced'})
    } else if(this.props.user.gamesWon >= 10) {
      this.setState({Rank: 'Ironhacker'})
    }
  }
  render() {
    return (
      <div>
        {
          this.state.edittoggle
          ?<Edit edittoggle = {this.toggleedit}/>
          :null
        }
        {
          this.state.deletetoggle
          ?<Delete deletetoggle = {this.toggledelete}/>
          :null
        }
        <div className = 'topdivandlogout'>
          <div>
          <Link to="/creategame" className ='creategamediv'>
            {' '}
            <img src={require('./../images/plus-square.svg')} alt = '' className = 'plusicon'/>
            <h1>Create a Game</h1>
          </Link>
          </div>
          <a onClick = {this.props.logout}>
            <img src={require('./../images/exit.svg')} alt = '' className = 'exiticon'/>
          </a>
        </div>
        <div className = 'bottomdiv'>
          <div className = 'profilediv'>
            {/* <img src = {this.props.user.photoUrl} alt='' /> */}
            <div style = {{borderRight: '2px solid black',height: '24.9vh',borderTop:'1px solid black', borderBottom:'1px solid black', width: '250px', backgroundImage: `url(${this.props.user.photoUrl})`,backgroundPosition:'center top', backgroundSize:'cover'}}></div>
            <div className = 'profiledivtext'>
              <div className = 'profiledivtextheader'>{this.props.user.username}
              <article>Rank: {this.state.Rank}</article>
              </div>
              <p>Games Played: {this.props.user.gamesPlayed
                                ?this.props.user.gamesPlayed.length :null}</p>
              <p>Games Won: {this.props.user.gamesWon
                                ?this.props.user.gamesWon.length :null}</p>
            </div>
            <div className = 'icondivbottom'>
              <a onClick = {this.toggleedit} style = {{border:'none'}} href = ''>
                <img src={require('./../images/edit.svg')} alt = '' className = 'editicon'/>
              </a>
              <a onClick = {this.toggledelete} style = {{border:'none'}} href =''>
              <img src={require('./../images/trash-2.svg')} alt = '' className = 'trashicon'/>
              </a>
            </div>
          </div>
          <Link to="/addquestion">
            {' '}
          <div className = 'addquestiondiv'>
            <h1>Add a Question</h1>
          </div>
          </Link>
        </div>
      </div>
      
    );
  }
}

export default withAuth(Home);






