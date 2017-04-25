export function winningMessage(winner){
  if(winner === null){
    return "IMPOSSIBLE TIC-TC-TOE"
  } else if(winner === "tie"){
    return "TIE GAME"
  } else {
    return winner + " HAS WON!"
  }
}

export function tieGame(gameBoard){
  let moves = gameBoard.join("").replace(/ /g, "");
  if(moves.length === 9){
    return true
  } else {
    return false
  }
}

export function copyBoard(gameBoard){
  return gameBoard.slice(0)
}

export function validMove(move, player, gameBoard){
  var newBoard = copyBoard(gameBoard)
  if(newBoard[move] === " "){
    newBoard[move] = player;
    return newBoard
  }else{
    return null;
  }
}


export function winner(gameBoard, player){
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
