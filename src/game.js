import React from 'react';
import Board from './board'
import './index.css';
import './responsive.css';

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

// Get Location Of Move
const getCurrentLocation = (move) => {
    const locationMap = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    };
    return locationMap[move];
};

// ========================================

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

            // Track Current Step
            stepNumber: 0,
        };
    }

    // Square On Click Handler Method
    handleClick(i) {
        // Create a copy of the data - Immutable
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
            // Concat Click To Array
            history: history.concat([{
                squares: squares,
                currentLocation: getCurrentLocation(i),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    // JumpTo Method for going back through the moves
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        // Declare Variables
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // History of Moves Buttons
        const moves = history.map((step, move) => {
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';

            const desc = move ?
                'Go to move #' + move + ' - ' + currentLocation:
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        className={move === this.state.stepNumber ? 'move-list-item-selected' : ''}
                        onClick={() => this.jumpTo(move)}
                       >{desc}
                    </button>
                </li>
            );
        });

        // Declare Winner or Next Player
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
