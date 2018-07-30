import {MAKE_MOVE, GO_BACK} from './type.js';
import Redux from 'redux';

export function makeMove (square, index) {
  return {
    type: MAKE_MOVE,
    square
  }
}

export function goBack (step) {
  return {
    type: GO_BACK,
    step
  }
}
