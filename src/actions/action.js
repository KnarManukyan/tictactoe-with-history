import {HANDLE_CLICK, GO_BACK} from './type.js';
import Redux from 'redux';

export function handleClick (square) {
  return {
    type: HANDLE_CLICK,
    square
  }
}

export function goBack (step) {
  return {
    type: GO_BACK,
    step
  }
}
