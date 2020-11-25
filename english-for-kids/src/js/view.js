'use strict';

const view = {
  wrapperCardsDiv: document.querySelector('.cards'),
  appendCards(cards) {
    const currentCards = cards;
    for (let i = 0; i < currentCards.length; i++) {
      const card = currentCards[i];
      const htmlCard = `<article class="card">
                        <div class="card__img-wrapper">
                            <img src="${card.getLinkImg()}" alt="${card.getEnglishWord()}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${card.getEnglishWord()}</span>
                            <button class="card__load-wrap">
                                <img src="../assets/icons/load.jpg" alt="loader" class="card__load-img">
                            </button>
                        </div>
                    </article>`;
      this.wrapperCardsDiv.insertAdjacentHTML('beforeend', htmlCard);
    }
  },
  appendMainCards(cardsGroups) {
    const keysEntries = cardsGroups.keys();
    const keys = Array.from(keysEntries);
    for (let i = 0; i < keys.length; i++) {
      const currentGroup = keys[i];
      const currentCards = cardsGroups.get(currentGroup);
      const coverCard = currentCards[0];
      const htmlCard = `<article class="card">
                        <div class="card__img-wrapper">
                            <img src="${coverCard.getLinkImg()}" alt="${coverCard.getEnglishWord()}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${currentGroup}</span>
                        </div>
                    </article>`;
      this.wrapperCardsDiv.insertAdjacentHTML('beforeend', htmlCard);
    }
  },
  reverseCard(card, reversedLanguage) {

  },
  hideNameCards() {

  },
  openCloseMenu() {

  },
};

export default view;
