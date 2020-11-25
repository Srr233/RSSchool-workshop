'use strict';

import controller from './controller.js';
import Card from './card.js';

function init() {
  function createCards(parsedCards) {
    const cardsMap = new Map();
    const iterableCards = Object.entries(parsedCards);

    for (let i = 0; i < iterableCards.length; i++) {
      const [key, value] = iterableCards[i];

      const transformedCard = value.map((c) => new Card(
        c.numberImg,
        c.group,
        c.russianWord,
        c.englishWord,
      ));
      cardsMap.set(key, transformedCard);
    }

    return cardsMap;
  }

  function initController(mapCards) {
    controller.initContent(mapCards);
  }

  const request = new XMLHttpRequest();
  request.open('GET', '../assets/content/allCards.json');
  request.onload = () => {
    const allCardsMap = createCards(JSON.parse(request.response));
    initController(allCardsMap);
  };
  request.send();
}
init();
