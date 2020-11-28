'use strict';

import { forView } from './services.js';

const view = {
  wrapperCardsDiv: document.querySelector('.cards'),
  burgerMenu: document.querySelector('.open-navigation'),
  navigation: document.querySelector('.navigation'),
  links: document.querySelectorAll('.list__link'),
  switchToggle: document.querySelector('.switch__toggle'),
  switchText: document.querySelector('.switch__text'),
  appendCards(cards, callbacks) {
    forView.clearChildren(this.wrapperCardsDiv);

    const currentCards = cards;
    for (let i = 0; i < currentCards.length; i++) {
      const card = currentCards[i];

      const elementCard = forView.createElement('card', card.getLinkImg(),
        card.getEnglishWord(), card.getEnglishWord());

      const buttonReverse = elementCard.querySelector('.card__load-wrap');

      forView.bindEvent(buttonReverse, 'click', callbacks.reverse);
      forView.bindEvent(elementCard, 'mouseleave', callbacks.reverse);

      this.wrapperCardsDiv.insertAdjacentElement('beforeend', elementCard);
    }
  },
  appendMainCards(cardsGroups, callback) {
    forView.clearChildren(this.wrapperCardsDiv);

    const keysEntries = cardsGroups.keys();
    const keys = Array.from(keysEntries);

    for (let i = 0; i < keys.length; i++) {
      const currentGroup = keys[i];
      const currentCards = cardsGroups.get(currentGroup);
      const card = currentCards[0];

      const elementCard = forView.createElement('group', card.getLinkImg(),
        card.getEnglishWord(), currentGroup);

      forView.bindEvent(elementCard, 'click', callback);

      this.wrapperCardsDiv.insertAdjacentElement('beforeend', elementCard);
    }
  },
  reverseCard(target, reversedLanguage) {
    const wrapCardElem = forView.getCurrentElemCard(target);
    const wrapperName = wrapCardElem.querySelector('.card__text');
    const button = wrapCardElem.querySelector('.card__load-wrap');
    const blockName = wrapCardElem.querySelector('.word-wrap');
    const reversed = wrapCardElem.classList.contains('reverse');

    if (!reversed) {
      wrapCardElem.classList.remove('normal');
      wrapCardElem.classList.add('reverse');
      blockName.classList.add('reverse');

      button.style.display = 'none';

      wrapperName.classList.add('reverse');
    } else if (reversed) {
      wrapCardElem.classList.add('normal');
      wrapCardElem.classList.remove('reverse');
      blockName.classList.remove('reverse');

      button.style.display = 'inline';

      wrapperName.classList.remove('reverse');
    }
    wrapperName.textContent = reversedLanguage;
  },
  hideOpenNameCards(isOpen) {
    const namesWrap = document.querySelectorAll('.word-wrap');
    if (isOpen) {
      namesWrap.forEach((e) => { e.style.display = 'none'; });
    } else {
      namesWrap.forEach((e) => { e.style.display = 'flex'; });
    }
  },
  openCloseMenu() {
    const isOpen = this.burgerMenu.classList.contains('open');

    if (isOpen) {
      this.navigation.classList.add('close');
      this.navigation.classList.remove('open');

      this.burgerMenu.classList.add('close');
      this.burgerMenu.classList.remove('open');
    } else {
      this.navigation.classList.add('open');
      this.navigation.classList.remove('close');

      this.burgerMenu.classList.add('open');
      this.burgerMenu.classList.remove('close');
    }
  },
  showPlayTrain() {
    const text = this.switchText.textContent;
    const changedText = text === 'play' ? 'train' : 'play';

    this.switchText.textContent = changedText;

    switch (changedText) {
      case 'play':
        this.switchToggle.classList.add('play');
        this.switchToggle.classList.remove('train');
        this.hideOpenNameCards(true);
        break;
      case 'train':
        this.switchToggle.classList.add('train');
        this.switchToggle.classList.remove('play');
        this.hideOpenNameCards(false);
        break;
      default:
        throw new Error('Not found class');
    }
  },
  bindFoo(callbacks) {
    const { switchFoo, burgerMenuFoo, navFoo } = callbacks;
    forView.bindEvent(this.switchToggle, 'click', switchFoo);
    forView.bindEvent(this.burgerMenu, 'click', burgerMenuFoo);
    this.links.forEach((e) => forView.bindEvent(e, 'click', navFoo));
  },
  bindStartGameFoo(callback) {

  },
};

export default view;
