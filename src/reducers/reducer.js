import {HANDLE_CLICK, GO_BACK} from '../actions/type.js';
const initialState = {
    history: [[ null, null, null,
                null, null, null,
                null, null, null,]],
    winner: null,
    step: 0,
    xIsNext: true,
};

export default function(state = initialState, action){
    switch (action.type) {
      case HANDLE_CLICK: {
              state.history.push(action.square);
              return ({
                history: state.history,
                xIsNext: !state.xIsNext,
                step: ++state.step,
                winner: findWinner(action.square)
              })
          }
      case GO_BACK : {
              return ({
                history: state.history,
                xIsNext: state.xIsNext,
                step: action.step,
                winner: state.winner
              })
      }
      default:
          return state;
    }
  }



  const findWinner = function (square) {
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
