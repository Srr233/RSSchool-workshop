'use strict';

import { forView } from './services.js';

const view = {
  wrapperCardsDiv: document.querySelector('.cards'),
  appendCards(cards, callback) {
    forView.clearChildren(this.wrapperCardsDiv);

    const currentCards = cards;
    for (let i = 0; i < currentCards.length; i++) {
      const card = currentCards[i];

      const elementCard = forView.createElement('card', card.getLinkImg(),
        card.getEnglishWord(), card.getEnglishWord());

      const buttonReverse = elementCard.querySelector('.card__load-wrap');

      forView.bindEvent(buttonReverse, 'click', callback);

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
  reverseCard(card, reversedLanguage) {
    let isReverse = false;
    const name = card.querySelector('.card__text');
    if (!card.classList.contains('reverse')) {
      card.classList.remove('normal');
      card.classList.add('reverse');
      isReverse = true;
    } else if (!card.classList.contains('normal')) {
      card.classList.add('normal');
      card.classList.remove('reverse');
      isReverse = false;
    }
    requestAnimationFrame(() => {
      if (isReverse) {
        name.textContent = reversedLanguage;
      } else {
        name.textContent = reversedLanguage;
      }
    });
  },
  hideNameCards() {

  },
  openCloseMenu() {

  },
};

export default view;
