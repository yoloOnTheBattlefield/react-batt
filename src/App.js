import React, { Component } from 'react';
import { create } from 'apisauce';

import Game from './Components/Game';


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
      battles : []
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


//this is the issue
//what I'm thinking is that I write the wrong path for retrieving the id of the game
  deleteGame(id){
    api
      .delete(`/battle/${id}`)
  }
  logId(id){
    api
      .get(`/battle/${id}`)
      .then(data => console.log(data));
  }

//renders a list with the games
//this will eventually be a react-router navigation thing
  _makeBattles(){
    return this.state.battles.map(battle => {
      const id = battle.battleId;
      return (
        <li key={id}>{id}
          <button key={id} onClick={() => this.deleteGame(id)}>Delete Game</button>
          <button  onClick={() => this.logId(id)}>Log Game</button>
        </li>
      )
    })
  }


  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <Game />
        <button onClick={this.getBattle.bind(this)}>Get Battles!</button>
        <button onClick={this.postBattle.bind(this)}>Post Battles!</button>
        <ul>
          {
            this._makeBattles()
          }
        </ul>
      </div>
    );
  }
}

export default App;
