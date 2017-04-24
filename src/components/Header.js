import React, { Component } from 'react';
import '../style/Header.css'

export default function Header(props) {
  return (
    <div className={this.props.winner ? 'visible' : 'hidden'}>
      <h2>{this.props.winner} Has Won!</h2>
   </div>
  );
}
