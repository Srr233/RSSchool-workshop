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
    let elementCard = e.target;

    while (elementCard.tagName !== 'ARTICLE') {
      elementCard = elementCard.parentElement;
    }
    const currentGroup = elementCard.querySelector('.card__text').textContent;

    model.setCurrentGroup(currentGroup);
    view.appendCards(model.getCurrentGroup());
  },
  pressCard(e) {

  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(mapCards, this.selectCategory);
  },
};

export default controller;
