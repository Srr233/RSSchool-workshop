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
      view.updateStatistics(cards[0].getEnglishWord(), 'asked');
      view.clickStartButton();
      setTimeout(() => { view.toggleStartButton(true); }, 1000);
      this.sortGroups = cards;
    } else {
      view.rotateButton();
      const index = this.currentIndexCard;
      const { length } = this.sortGroups;
      const card = this.sortGroups[index];

      if (index === length) {
        this.start = false;
        this.play = false;
        view.toggleStartButton(false);
      } else {
        view.updateStatistics(card.getEnglishWord(), 'asked');
        setTimeout(() => view.reading(card.getLinkSound()), 1000);
      }
    }
  },
  selectCategory(e) {
    if (e.target.classList.contains('cards') || !e.target.classList[0]) {
      return;
    }
    const name = forController.getCamelCaseName(e.target);

    if (name === 'main') {
      view.appendMainCards(model.allGroup, this.selectCategory.bind(this));
    } else if (name === 'statistics') {
      view.appendStatistics();
      view.turnOnSwitcher();
    } else {
      model.setCurrentGroup(name);
      view.appendCards(model.getCurrentGroup(), this.reverseCurrentCard, name);
      view.checkSwitcher();
      this.switchPlayTrain();
      this.switchPlayTrain();
      view.turnOnSwitcher();
    }
    view.setCategory(forController.getNormalCaseName(e.target));
    e.stopPropagation();
  },
  pressCard(e) {
    if (e.target.classList.contains('cards') || !e.target.classList[0]) {
      return;
    }
    const name = forController.getNormalCaseName(e.target);
    const currentCard = model.getCurrentCard(name);
    const currentElemCard = forController.getCurrentElemCard(e.target);
    const canPress = currentElemCard.classList.contains('correct')
    || currentElemCard.classList.contains('reverse');
    let isEnd;

    if (this.play && this.start) {
      const index = this.currentIndexCard;
      if (this.sortGroups[index] === currentCard) {
        this.currentIndexCard += 1;
        isEnd = view.showGoodBad(true, e.target);
        view.updateStatistics(name, 'hit');
        view.updateStatistics(name, 'percent');
        this.startGame();
        view.reading('../assets/sounds/choice/Yes.mp3');
      } else if (!canPress) {
        view.updateStatistics(name, 'miss');
        view.updateStatistics(name, 'percent');
        view.showGoodBad(false, e.target);
        view.reading('../assets/sounds/choice/No.mp3');
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
    } else if (!this.play && !canPress) {
      view.updateStatistics(name, 'train');
      view.reading(currentCard.getLinkSound());
    }
  },
  sortStatistics(e) {
    let sorting = e.target.textContent.toLowerCase();

    if (sorting === '% wrong') {
      sorting = 'percent';
    } else if (sorting === 'category / word') {
      sorting = 'name';
    }

    view.sortBy(sorting);
  },
  openMenu(e) {
    const tag = e.target.tagName;
    if (tag === 'NAV' || tag === 'UL' || tag === 'LI') {
      return;
    }
    view.openCloseMenu();
  },
  initContent(mapCards) {
    model.setGroups(mapCards);
    view.appendMainCards(model.allGroup, this.selectCategory.bind(this));
    view.showStatistics(model.allGroup);
    view.bindFoo({
      switchFoo: this.switchPlayTrain.bind(this),
      burgerMenuFoo: this.openMenu,
      navFoo: this.selectCategory.bind(this),
      pressCard: this.pressCard.bind(this),
      startGame: this.startGame.bind(this),
      sortStatistics: this.sortStatistics,
    });
  },
};

export default controller;
