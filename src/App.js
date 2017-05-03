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
      .then(response => console.log(response));
  }



  componentDidMount(){

  }
  render() {
    if(this.state.battles.length === 0){

    }
    return (
      <div className="App">
        <Game />
        <button onClick={this.getBattle.bind(this)}>Get Battles</button>
        <ul>
          {
            this.state.battles.map(battle => {
              const id = battle.battleId;
              return <li key={id}>{id}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
