'use strict';

import model from './model.js';
import view from './view.js';

const controller = {
  switchPlayTrain(e) {

  },
  reverseCurrentCard(e) {

  },
  startGame(e) {

  },
  selectCategory(e) {

  },
  pressCard(e) {

  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(mapCards);
  },
};

export default controller;
