import React, { Component } from 'react';
import { create } from 'apisauce';

import Game from './Components/Game';

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

  postBattle(){
    api
      .post('/battle')
      .then(this.getBattle())

  }

  deleteGame(id){
    api
      .delete(`/battle/${id}`)
  }
  logId(id){
    api
      .get(`/battle/${id}`)
      .then(data => console.log(data));
  }

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
