import React from 'react';
import '../style/FlashMessage.css'

export default function FlashMessage(props) {
  return (
    <div className={props.flash === true ? "flash_message" : "hidden"}>
      <h1>GAME OVER</h1>
    </div>
  );
}
