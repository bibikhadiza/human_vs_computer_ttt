import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile'
import Scores from './components/Scores'
import FlashMessage from './components/FlashMessage'
import {winningMessage, tieGame, copyBoard, validMove, winner} from './actions'

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
      minPlayer: "O",
      playerXScore: 0,
      playerOScore: 0,
      flashMessage: false
    }
    this.resetBoard = this.resetBoard.bind(this)
    this.gameInProgress = this.gameInProgress.bind(this)
  }

aiMove(gameBoard){
    let bestMove = 100;
    let move = null;
    if(winner(gameBoard, "X") || winner(gameBoard, "O") || tieGame(gameBoard)){
      return null;
    }
    for(var x = 0; x < gameBoard.length; x++){
      let newBoard = validMove(x, this.state.minPlayer, gameBoard);
      if(newBoard){
        var score = this.maxScore(newBoard);
        if(score < bestMove){
          bestMove = score;
          move = x;
        }
      }
    }
    return move;
  }

  minScore(gameBoard){
    if(winner(gameBoard, "X")){
      return 10;
    } else if(winner(gameBoard, "O")){
      return -10;
    } else if (tieGame(gameBoard)){
      return 0;
    } else {
      var bestMove = 100;
      for(var x = 0; x < gameBoard.length; x++){
        var boardCopy = validMove(x, this.state.minPlayer, gameBoard);
        if(boardCopy){
          var newPredictionMove = this.maxScore(boardCopy);
          if(newPredictionMove < bestMove ){
            bestMove = newPredictionMove;
          }
        }
      }
      return bestMove;
    }
  }

  maxScore(gameBoard){
    if(winner(gameBoard, "X")){
      return 10;
    } else if(winner(gameBoard, "O")){
      return -10;
    } else if (tieGame(gameBoard)){
      return 0;
    } else {
      var bestMove = -100;
      for(var x = 0; x < gameBoard.length; x++){
        var boardCopy = validMove(x, this.state.maxPlayer, gameBoard);
        if(boardCopy){
          var newPredictionMove = this.minScore(boardCopy);
          if(newPredictionMove > bestMove ){
            bestMove = newPredictionMove;
          }
        }
      }
      return bestMove;
    }
  }

  gameInProgress(move){
    if(this.state.winner !== null){
      return;
    }
    let player = this.state.turn;
    let currentBoard = validMove(move, player, this.state.gameBoard);
    if(winner(currentBoard, player )){
      this.setState({
        gameBoard: currentBoard,
        winner: player,
        playerXScore: this.state.playerXScore + 1
      })
    }
    if(tieGame(currentBoard)){
      this.setState({
        gameBoard: currentBoard,
        winner: "tie"
      });
    }

    player = "O";
    currentBoard = validMove(this.aiMove(currentBoard), player, currentBoard);
    if(winner(currentBoard, player)){
      this.setState({
        gameBoard: currentBoard,
        winner: player,
        playerOScore: this.state.playerOScore + 1,
        flashMessage: true
      })
    }

    this.setState({
      gameBoard: currentBoard
    })
  }

  resetBoard(){
    this.setState({
      gameBoard: [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
      ],
      turn: 'X',
      winner: null,
      maxPlayer: "X",
      minPlayer: "O",
      flashMessage: false
    })
  }

  render() {
    const tiles = this.state.gameBoard.map(function(value, i){
      return(<Tile key={i} move={i} value={value} gameInProgress={this.gameInProgress}/>
    )}.bind(this))

    return (
      <div className="App">
          <div className="board">
            <FlashMessage flash={this.state.flashMessage}/>
            {tiles}
          <Scores
            winner={winningMessage(this.state.winner)}
            resetBoard={this.resetBoard}
            humanPlayerScore={this.state.playerXScore}
            compPlayerScore={this.state.playerOScore}
          />
          </div>
      </div>
    );
  }

}

export default App;
