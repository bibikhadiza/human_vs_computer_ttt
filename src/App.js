import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile'
import Scores from './components/Scores'
import FlashMessage from './components/FlashMessage'

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
    this.copyBoard = this.copyBoard.bind(this)
    this.tieGame = this.tieGame.bind(this)
    this.winningMessage = this.winningMessage.bind(this)
  }

  winner(gameBoard, player){
    if(
      (gameBoard[0] === player && gameBoard[1] === player && gameBoard[2] === player) ||
      (gameBoard[3] === player && gameBoard[4] === player && gameBoard[5] === player) ||
      (gameBoard[6] === player && gameBoard[7] === player && gameBoard[8] === player) ||
      (gameBoard[0] === player && gameBoard[3] === player && gameBoard[6] === player) ||
      (gameBoard[1] === player && gameBoard[4] === player && gameBoard[7] === player) ||
      (gameBoard[2] === player && gameBoard[5] === player && gameBoard[8] === player) ||
      (gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player) ||
      (gameBoard[2] === player && gameBoard[4] === player && gameBoard[6] === player)
    ){
      return true;
    } else {
      return null;
    }
  }

  copyBoard(gameBoard){
    return gameBoard.slice(0)
  }

  validMove(move, player, gameBoard){
    var newBoard = this.copyBoard(gameBoard)
    if(newBoard[move] === " "){
      newBoard[move] = player;
      return newBoard
    }else{
      return null;
    }
  }

  aiMove(gameBoard){
    let bestMove = 100;
    let move = null;
    if(this.winner(gameBoard, "X") || this.winner(gameBoard, "O") || this.tieGame(gameBoard)){
      return null;
    }
    for(var x = 0; x < gameBoard.length; x++){
      let newBoard = this.validMove(x, this.state.minPlayer, gameBoard);
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
    if(this.winner(gameBoard, "X")){
      return 10;
    } else if(this.winner(gameBoard, "O")){
      return -10;
    } else if (this.tieGame(gameBoard)){
      return 0;
    } else {
      var bestMove = 100;
      for(var x = 0; x < gameBoard.length; x++){
        var boardCopy = this.validMove(x, this.state.minPlayer, gameBoard);
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
    if(this.winner(gameBoard, "X")){
      return 10;
    } else if(this.winner(gameBoard, "O")){
      return -10;
    } else if (this.tieGame(gameBoard)){
      return 0;
    } else {
      var bestMove = -100;
      for(var x = 0; x < gameBoard.length; x++){
        var boardCopy = this.validMove(x, this.state.maxPlayer, gameBoard);
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
    let currentBoard = this.validMove(move, player, this.state.gameBoard);
    if(this.winner(currentBoard, player )){
      this.setState({
        gameBoard: currentBoard,
        winner: player,
        playerXScore: this.state.playerXScore + 1
      })
    }
    if(this.tieGame(currentBoard)){
      this.setState({
        gameBoard: currentBoard,
        winner: "tie"
      });
    }

    player = "O";
    currentBoard = this.validMove(this.aiMove(currentBoard), player, currentBoard);
    if(this.winner(currentBoard, player)){
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

  tieGame(gameBoard){
    let moves = gameBoard.join("").replace(/ /g, "");
    if(moves.length === 9){
      return true
    } else {
      return false
    }
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


  winningMessage(){
    if(this.state.winner === null){
      return "IMPOSSIBLE TIC-TC-TOE"
    } else if(this.state.winner === "tie"){
      return "TIE GAME"
    } else {
      return this.state.winner + " HAS WON!"
    }
  }


  render() {
    const tiles = this.state.gameBoard.map(function(value, i){
      return(<Tile key={i} move={i} value={value} gameInProgress={this.gameInProgress}/>
    )}.bind(this))

    return (
      <div className="App">
        <FlashMessage flash={this.state.flashMessage}/>
          <div className="board">
            {tiles}
          <Scores
            winner={this.winningMessage()}
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
