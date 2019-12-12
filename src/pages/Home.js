import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import Edit from './Edit';

class Private extends Component {
  state = {
    Rank: 'Noob',
    edittoggle: false,
    deletetoggle: false,
  }
  toggleedit = (event) => {
    event.preventDefault();
    let toggle = !this.state.edittoggle
    this.setState({edittoggle: toggle})
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
        <div className = 'topdivandlogout'>
          <div className = 'creategamediv'>
          <Link to="/creategame">
            {' '}
            <img src={require('./../images/plus-square.svg')} alt = '' className = 'plusicon'/>
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
              <p>Games Played: {this.props.user.gamesPlayed.length}</p>
              <p>Games Won: {this.props.user.gamesWon}</p>
            </div>
            <div className = 'icondivbottom'>
              <a onClick = {this.toggleedit} style = {{border:'none'}} href = ''>
                <img src={require('./../images/edit.svg')} alt = '' className = 'editicon'/>
              </a>
              <img src={require('./../images/trash-2.svg')} alt = '' className = 'trashicon'/>
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

export default withAuth(Private);






