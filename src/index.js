import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import store from './store.js';
import {connect} from 'react-redux';
import Game from './container/game.js'


// ========================================

ReactDOM.render(
  <Provider store={store}>
        <Game />
     </Provider>,
  document.getElementById('root')
);
