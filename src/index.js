import React from 'react';
import ReactDOM from 'react-dom';
 import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.text}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [[
      null, null, null,
      null, null, null,
      null, null, null,
    ]],
      winner: null,
      step: 0,
      xIsNext: true,
    };
  }
  nextPlayer(){
    return this.state.xIsNext ? 'X' : 'O';
  }
  handleClick(i) {
    const currentStep = this.state.history[this.state.step];
    const square = currentStep.slice();
    if(square[i] === null && !this.findWinner()){
        square[i] = this.nextPlayer();
        this.state.history.push(square);
        this.setState({
          xIsNext: !this.state.xIsNext,
          step: ++this.state.step
        })
    }
    if(this.findWinner()){
      this.setState({winner: this.findWinner()});
    }
  }
  renderSquare(i) {
    return (<Square text={this.state.history[this.state.step][i]} onClick={() => this.handleClick(i)}/>);
  }
  findWinner = () => {
    const square = this.state.history[this.state.history.length-1];
    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
          return square[a];
        }
      }
      if(!square.includes(null)){
        return "tie";
      }
      return null;
   }
  render() {
    let status = "Next player is " + this.nextPlayer();
    if(this.state.winner){
      status = this.state.winner + (this.state.winner !== "tie" ? " won!" : "!");
    }
    const stepButton = this.state.history.map((x,index) => {
      return (
        <button key={index} onClick={() => {
          this.setState({step: index});
        }}>
          {index}
        </button>
      );
    })
    return (
      <div>
        <div className="status">{status}</div>
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
        <p>history</p>
        <ol>
        {stepButton}
        </ol>
      </div>

    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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
