import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Render Squares with properties
// props values passed in from Board class
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// Render Board
class Board extends React.Component {

    // Render Squares Method
    renderSquare(i) {
        // Call Square Function and fill values
        return (
            <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
        );
    }

    // Render HTML To Screen
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

class Game extends React.Component {

    // Constructor to manage square states
    constructor(props) {
        super(props)
        this.state = {
            // Store Board History
            history: [{
                // Define Length and default to null
                squares: Array(9).fill(null),
            }],

            // Track the turn order
            xIsNext: true,
        };
    }

    // Square On Click Handler Method
    handleClick(i) {
        // Create a copy of the data - Immutable
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // If won, stop anymore clicks
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // Set Turn Order depending on xIsNext
        // Set Square State and re-render
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        // Declare Variables
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;

        // check if game won other wise show next player
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// Calculate Winner
function calculateWinner(squares) {

    // Winning Lives Array
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Loop through winning lines
    for (let i = 0; i < lines.length; i++) {
        // comparing the squares in our array position to the winning one
        const [a, b, c] = lines[i];
        // then checking the following:
        // 1. Compare A to itself and then compare A to B and e.g. A = X And then A to B
        // 2. Compare A to C
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // Return Player Winner X or O
            return squares[a];
        }
    }

    // Return Null by default
    return null;
}
