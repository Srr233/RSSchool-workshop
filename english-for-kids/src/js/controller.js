'use strict';

import model from './model.js';
import view from './view.js';
import { forController } from './services.js';

const controller = {
  switchPlayTrain(e) {
    view.showPlayTrain();
  },
  reverseCurrentCard(e) {
    let name;
    let target;
    const child = e.target.firstElementChild;

    if (e.type === 'mouseleave' && child.classList.contains('reverse')) {
      name = forController.getName(child);
      target = child;
    } else if (e.type === 'mouseleave') {
      return;
    } else {
      name = forController.getName(e.target);
      target = e.target;
    }

    const currentCard = model.getCurrentCard(name);
    currentCard.changeLanguage();

    view.reverseCard(target, currentCard.getCurrentLanguage());
  },
  startGame(e) {

  },
  selectCategory(e) {
    const name = forController.getName(e.target);

    model.setCurrentGroup(name);
    view.appendCards(model.getCurrentGroup(), {
      reverse: this.reverseCurrentCard,
      press: this.pressCard,
    });
  },
  pressCard(e) {

  },
  openMenu(e) {
    view.openCloseMenu();
  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(mapCards, this.selectCategory.bind(this));
    view.bindFoo({
      switchFoo: this.switchPlayTrain,
      burgerMenuFoo: this.openMenu,
      navFoo: this.selectCategory.bind(this),
    });
    view.bindStartGameFoo(this.startGame);
  },
};

export default controller;
