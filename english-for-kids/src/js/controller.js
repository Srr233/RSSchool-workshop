'use strict';

import model from './model.js';
import view from './view.js';
import { forController } from './services.js';

const controller = {
  play: false,
  start: false,
  sortGroups: Array,
  currentIndexCard: 0,
  switchPlayTrain() {
    const isPlay = view.showPlayTrain();
    if (!isPlay) {
      this.currentIndexCard = 0;
      this.sortGroups = [];
      this.start = false;
      this.play = false;
    }
    this.play = isPlay;
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
  startGame() {
    if (!this.start) {
      this.start = true;

      const cards = model.getCurrentGroup();
      cards.sort(() => Math.random() - Math.random());
      view.reading(cards[0].getLinkSound());
      this.sortGroups = cards;
    } else {
      const index = this.currentIndexCard;
      const { length } = this.sortGroups;
      const card = this.sortGroups[index];

      if (index === length) {

      } else { view.reading(card.getLinkSound()); }
    }
  },
  selectCategory(e) {
    const name = forController.getName(e.target);

    model.setCurrentGroup(name);
    view.appendCards(model.getCurrentGroup(), this.reverseCurrentCard);
    e.stopPropagation();
  },
  pressCard(e) {
    const name = forController.getName(e.target);
    const currentCard = model.getCurrentCard(name);

    if (this.play) {
      const index = this.currentIndexCard;
      if (this.sortGroups[index] === currentCard) {
        this.currentIndexCard += 1;
        view.showGoodBad(true, e.target);
        this.startGame();
      } else {
        view.reading('../assets/sounds/No/No.mp3');
        view.showGoodBad(false, e.target);
      }
    } else {
      view.reading(currentCard.getLinkSound());
    }
  },
  openMenu(e) {
    view.openCloseMenu();
  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(mapCards, this.selectCategory.bind(this));
    view.bindFoo({
      switchFoo: this.switchPlayTrain.bind(this),
      burgerMenuFoo: this.openMenu,
      navFoo: this.selectCategory.bind(this),
      pressCard: this.pressCard.bind(this),
      startGame: this.startGame.bind(this),
    });
  },
};

export default controller;
