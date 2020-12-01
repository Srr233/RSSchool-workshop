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
      view.toggleStartButton(false);
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
      name = forController.getNormalCaseName(child);
      target = child;
    } else if (e.type === 'mouseleave') {
      return;
    } else {
      name = forController.getNormalCaseName(e.target);
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
      view.toggleStartButton(true);
      this.sortGroups = cards;
    } else {
      const index = this.currentIndexCard;
      const { length } = this.sortGroups;
      const card = this.sortGroups[index];

      if (index === length) {
        this.start = false;
        this.play = false;
        view.toggleStartButton(false);
      } else {
        setTimeout(() => view.reading(card.getLinkSound()), 1000);
      }
    }
  },
  selectCategory(e) {
    const name = forController.getCamelCaseName(e.target);

    if (name === 'main') {
      view.appendMainCards(model.allGroup, this.selectCategory.bind(this));
    } else {
      model.setCurrentGroup(name);
      view.appendCards(model.getCurrentGroup(), this.reverseCurrentCard, name);
      e.stopPropagation();
    }
    view.setCategory(forController.getNormalCaseName(e.target));
  },
  pressCard(e) {
    const name = forController.getNormalCaseName(e.target);
    const currentCard = model.getCurrentCard(name);
    const currentElemCard = forController.getCurrentElemCard(e.target);
    const canPress = currentElemCard.classList.contains('correct');
    let isEnd;

    if (this.play) {
      const index = this.currentIndexCard;
      if (this.sortGroups[index] === currentCard) {
        this.currentIndexCard += 1;
        isEnd = view.showGoodBad(true, e.target);
        this.startGame();
        view.reading('../assets/sounds/choice/Yes.mp3');
      } else if (!canPress) {
        view.reading('../assets/sounds/choice/No.mp3');
        view.showGoodBad(false, e.target);
      }
      if (isEnd) {
        this.currentIndexCard = 0;
        this.sortGroups = [];
        this.start = false;
        this.play = false;
        view.toDefault();
        view.toggleStartButton(false);
        view.appendMainCards(model.allGroup, this.selectCategory.bind(this));
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
    view.appendMainCards(model.allGroup, this.selectCategory.bind(this));
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
