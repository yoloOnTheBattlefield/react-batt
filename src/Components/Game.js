import React, { Component } from 'react';

export default class Game extends Component{
  render(){
    return (
      <div className='Game'>
        {this.props.activeGame}
      </div>
    )
  }
}
