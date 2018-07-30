import React from 'react';
import '../index.css';
import Square from './square.js'
export default class Board extends React.Component {
  handleClick(i) {
   const currentsquare = this.props.square;
   if(currentsquare[i] === null && !this.props.winner){
       const square = currentsquare.slice();
       square[i] = this.props.determineNextPlayer();
       this.props.makeMove(square);
   }
  }
  renderSquare(i) {
    return (<Square text={this.props.square[i]} onClick={() => this.handleClick(i)}/>);
  }
  render() {
    const createSquares = () => {
      let lines = []
      for(let i = 0; i < 3; i++){
        lines.push(<div key = {i} className = "board-row">
          {this.renderSquare(3*i+0)}
          {this.renderSquare(3*i+1)}
          {this.renderSquare(3*i+2)}
        </div>);
      }
      return lines;
    }
    return (
      <div>
        {createSquares()}
      </div>
    );
  }
}
