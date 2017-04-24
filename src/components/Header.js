import React, { Component } from 'react';
import '../style/Header.css'

export default function Header(props) {
  return (
    <div className={props.winner ? 'visible' : 'hidden'}>
      <h2>{props.winner !== "tie" ? props.winner + " Has Won!" : "Tie Game"}</h2>
   </div>
  );
}
