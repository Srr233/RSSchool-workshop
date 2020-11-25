'use strict';

import model from './model.js';
import view from './view.js';
import { forController } from './services.js';

const controller = {
  switchPlayTrain(e) {

  },
  reverseCurrentCard(e) {
    const wrapCardElem = forController.getCurrentElemCard(e.target);
    const name = wrapCardElem.querySelector('.card__text').textContent;

    const currentCard = model.getCurrentCard(name);
    currentCard.changeLanguage();

    view.reverseCard(wrapCardElem, currentCard.getCurrentLanguage());
  },
  startGame(e) {

  },
  selectCategory(e) {
    const wrapCardElem = forController.getCurrentElemCard(e.target);
    const name = wrapCardElem.querySelector('.card__text').textContent;

    model.setCurrentGroup(name);
    view.appendCards(model.getCurrentGroup(), this.reverseCurrentCard);
  },
  pressCard(e) {

  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(mapCards, this.selectCategory.bind(this));
  },
};

export default controller;
