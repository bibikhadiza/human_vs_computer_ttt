import React from 'react';
import '../style/Scores.css'
import Button from './Button'

export default function Scores(props) {
  return (
    <div className="score_menu">
      <div className="score_header">
        <h3>{props.winner}</h3>
      </div>
        <div className="score_board">
          <div className="player_container">
            <h4 className="player_header">Player</h4>
            <h5 className="human">-Human</h5>
            <h5 className="computer">-Comupter</h5>
          </div>

          <div className="points_container">
            <h4 className="points_header">Score</h4>
            <h5 className="human_point">{props.humanPlayerScore}</h5>
            <h5 className="computer_point">{props.compPlayerScore}</h5>
          </div>
          <Button reset={props.resetBoard}/>
        </div>
    </div>
  );
}
