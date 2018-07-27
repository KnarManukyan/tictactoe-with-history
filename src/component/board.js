import React from 'react';
import '../index.css';
import Square from './square.js'
export default class Board extends React.Component {
  handleClick(i) {
   const currentsquare = this.props.square;
   if(currentsquare[i] === null && !this.props.winner){
       const square = currentsquare.slice();
       square[i] = this.props.determineNextPlayer();
       this.props.handleClick(square);
   }
  }
  renderSquare(i) {
    return (<Square text={this.props.square[i]} onClick={() => this.handleClick(i)}/>);
  }
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
