import React, { Component } from 'react';
import "../style/Tile.css";

export default class Tile extends Component{
  constructor(){
    super();
    this.tileClick = this.tileClick.bind(this)
  }

  tileClick(props){
    props.gameInProgress(props.move);
  }

  render(){
    return(
      <div onClick={() => {this.tileClick(this.props)}} className="tile">
        <p>{this.props.value}</p>
      </div>
    )
  }
}
