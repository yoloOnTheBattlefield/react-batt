import React from 'react';
import { Link  } from 'react-router';

const Nav = (props) => {
  //renders a list with the games
  //this will eventually be a react-router navigation thing
    const makeBattles = (array) => {
      return array.map((battle, index) => {
        const id = battle.battleId;
        return (
          <li key={id}>
            <Link to={id} >Game {index}</Link>
            <button key={id} onClick={() => props.deleteGame(id)}>Delete Game</button>
          </li>
        )
      })
    }
  return (
    <div>
    this is the nav
      <button onClick={props.makeBattle}>New Game</button>
      <ul>
        {
          makeBattles(props.gameIds)
        }
      </ul>
    </div>
  )
}

export default Nav;
