'use strict';

import model from './model.js';
import view from './view.js';
import { forController, forModel } from './services.js';

const controller = {
  switchPlayTrain(e) {
    const isPlay = view.showPlayTrain();

    if (isPlay) {
      model.play();
    } else {
      model.train();
    }
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
    e.stopPropagation();
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
    e.stopPropagation();
  },
  pressCard(e) {
    const name = forController.getName(e.target);
    const currentCard = model.getCurrentCard(name);

    view.reading(currentCard.getLinkSound());
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
      pressCard: this.pressCard,
    });
    view.bindStartGameFoo(this.startGame);
  },
};

export default controller;
