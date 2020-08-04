import React from 'react';
import Square from './square';

// Render Board
class Board extends React.Component {

    // Render Squares Method
    renderSquare(i) {
        // Call Square Function and fill values
        return (
            <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
        );
    }

    // Render HTML To Screen
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
