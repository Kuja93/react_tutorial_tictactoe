import React from 'react';

// Render Squares with properties
const Square = props => (
    // props values passed in from Board class
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
);

export default Square;
