import React from 'react';
import '../style/Button.css'

export default function Button(props) {
  return (
    <button onClick={props.reset}>Reset</button>
  );
}
