import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Tile from './components/Tile'

class App extends Component {
  constructor(){
    super()
    this.state = {
      gameBoard: [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
      ],
      turn: 'X',
      winner: null,
      maxPlayer: "X",
      minPlayer: "O"
    }
  }





  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>TIC-TAC-TOE</h1>
          <Header winner={this.state.winner}/>
        </div>

      
      </div>
    );
  }
}

export default App;
