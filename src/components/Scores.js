import React from 'react';
import '../style/Scores.css'

export default function Scores(props) {
  return (
    <div className="score_menu">
      <div className="score_header">
        <h3>SYSTEM INFORMATION</h3>
      </div>
        <div class="score_board">
          <div className="player_container">
            <h4 className="player_header">Player</h4>
            <h5 className="human">-Human</h5>
            <h5 className="computer">-Comupter</h5>
          </div>

          <div className="points_container">
            <h4 className="points_header">Score</h4>
            <h5 className="human_point">0</h5>
            <h5 className="computer_point">0</h5>
          </div>
      </div>
    </div>
  );
}
