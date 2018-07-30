import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import store from '../store.js';
import {connect} from 'react-redux';
import Board from '../component/board.js';
import WinnerList from '../component/listOfWinners.js';
import {makeMove, goBack} from '../actions/action.js';
class Game extends React.Component {
  constructor() {
     super();
     this.state = {
       winners: [],
     }
  }
  determineNextPlayer = () => {
    return this.props.xIsNext ? 'X' : 'O';
  }
  componentDidMount() {
    (async () => {
      const result = await fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const winners = await result.json();
      winners.forEach((winner) => {
            winner.dayAndTime = winner.dayAndTime.slice(0,19). replace('T', " ");
      })
      this.setState({winners});
    })();
  }
  render() {
    let status = "Next player is " + this.determineNextPlayer();
    if(this.props.winner){
      status = this.props.winner + (this.props.winner !== "tie" ? " won!" : "!");
    }
    const stepButton = this.props.history.map((x,index) => {
      return (
        <button key={index} onClick={() => {
              this.props.goBack(index);
              }}>
          {index}
        </button>
      );
    })
    return (
      <div>
      <div>
      <div className="status">{status}</div>
      </div>
      <div className="game">
        <div className="game-board">
          <Board
              square = {this.props.history[this.props.step]}
              winner = {this.props.winner}
              determineNextPlayer = {this.determineNextPlayer}
              makeMove = {this.props.makeMove}/>
        </div>
        <div className="game-info">
            <p>history</p>
            <ol>
            {stepButton}
            </ol>
            <div>
              <WinnerList winners={this.state.winners}/>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
    winner: state.winner,
    step: state.step,
    xIsNext: state.xIsNext
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeMove: (square) => {
            dispatch(makeMove(square));
        },
        goBack: (step) => {
            dispatch(goBack(step));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
