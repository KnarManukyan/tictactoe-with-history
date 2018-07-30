import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Game from '../container/game';

export default class WinnerList  extends React.Component {
  render() {
    return (
      <div className='winnerList'>
              <h4> The history of winner </h4>
              {this.props.winners.map((winner, index) => {
                      return (
                      <ul class="winners" key={index}>{`id - ${winner.id}  winner - ${winner.winner} time - ${winner.dayAndTime}`}</ul>
                      )
                    })
                  }
      </div>
      );
  }
}
