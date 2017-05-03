import React, { Component } from 'react';
import { create } from 'apisauce';

import Game from './Components/Game';
import Nav from './Components/Nav';


//initial API configuration, passing the the header and the key
const api = create({
  baseURL: "https://zyqh9s9xt4.execute-api.eu-west-1.amazonaws.com/prod",
  headers: {
    'x-api-key': "L2Erl4l4zX78hylpiHCT71KxLScUAkcc4k4IARSv",
  }
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      battles: [],
      activeGame: ''
    }
  }
//calling the api and setting the state with all the id's of the current playing games
  getBattle(){
    api
      .get('/battle')
      .then(response => {
        const newBattles = response.data.battles;
        return this.setState({
          battles: newBattles
        })
      })
  }
//calling the api and creating a new game
//then calling the state again for a re-render of the state
  postBattle(){
    api
      .post('/battle')
      .then(this.getBattle())
  }

//*****************
//this is the issue
//what I'm thinking is that I write the wrong path for retrieving the id of the game
  deleteGame(id){
    console.log('clicked')
    api
      .delete(`/battle/${id}`)
  }
  logId(id){
    api
      .get(`/battle/${id}`)
      .then(data => console.log(data));
  }

  componentDidMount(){
    this.getBattle()
  }
  render() {
    return (
      <div className="App" onLoad={this.getBattle.bind(this)}>
        <Game activeGame={this.state.activeGame}/>
        <Nav
          gameIds={this.state.battles}
          deleteGame={this.deleteGame.bind(this)}
          makeBattle={this.postBattle.bind(this)}
        />
      </div>
    );
  }
}

export default App;
