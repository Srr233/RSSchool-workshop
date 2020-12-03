'use strict';

import { forView } from './services.js';

const view = {
  start: document.querySelector('.start'),
  switch: document.querySelector('.switch'),
  links: document.querySelectorAll('.list__link'),
  wrapperCardsDiv: document.querySelector('.cards'),
  navigation: document.querySelector('.navigation'),
  groupName: document.querySelector('.group__text'),
  statistics: document.querySelector('.statistics'),
  switchText: document.querySelector('.switch__text'),
  startButton: document.querySelector('.start__button'),
  starWrap: document.querySelector('.start__star-wrap'),
  burgerMenu: document.querySelector('.open-navigation'),
  switchToggle: document.querySelector('.switch__toggle'),
  statisticsWrapper: document.querySelector('.statistics__wrapper'),
  categories: document.querySelector('.categories'),
  sorting: 'up',
  appendCards(cards, callback, name) {
    this.statistics.style.display = 'none';

    forView.clearChildren(this.wrapperCardsDiv);

    const currentCards = cards;
    for (let i = 0; i < currentCards.length; i++) {
      const card = currentCards[i];

      const elementCard = forView.createElement('card', card.getLinkImg(),
        card.getEnglishWord(), card.getEnglishWord());

      const buttonReverse = elementCard.querySelector('.card__load-wrap');

      forView.bindEvent(buttonReverse, 'click', callback);
      forView.bindEvent(elementCard, 'mouseleave', callback);

      this.wrapperCardsDiv.insertAdjacentElement('beforeend', elementCard);
    }
    this.setCategory(name);
    this.start.style.display = 'flex';
  },
  appendMainCards(cardsGroups, callback) {
    this.statistics.style.display = 'none';

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
    this.start.style.display = 'none';
  },
  appendStatistics() {
    this.switch.style.display = 'none';
    forView.clearChildren(this.wrapperCardsDiv);
    this.statistics.style.display = 'inline';
  },
  checkSwitcher() {
    if (this.switch.textContent.trim() === 'play') {
      this.hideOpenNameCards(true);
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
        this.startButton.style.display = 'inline';
        this.hideOpenNameCards(true);
        break;
      case 'train':
        this.switchToggle.classList.add('train');
        this.switchToggle.classList.remove('play');
        this.startButton.style.display = 'none';
        forView.removeAllClasses('correct');
        forView.clearChildren(this.starWrap);
        this.hideOpenNameCards(false);
        break;
      default:
        throw new Error('Not found class');
    }
    return changedText === 'play';
  },
  reading(sound) {
    new Audio(sound).play();
  },
  showGoodBad(isGood, target) {
    const card = forView.getCurrentElemCard(target);
    const star = forView.createStar(isGood);
    const lengthStars = forView.howManyLength('.start__stars-img-wrap');

    if (lengthStars > 8) {
      this.starWrap.firstElementChild.remove();
    }
    if (isGood) {
      card.classList.add('correct');
      this.starWrap.insertAdjacentElement('beforeend', star);
    } else {
      this.starWrap.insertAdjacentElement('beforeend', star);
    }

    const isEnd = forView.checkEnd(this.wrapperCardsDiv.children);

    this.showResult(isEnd);
    return isEnd;
  },
  toggleStartButton(switcher) {
    const img = this.startButton.querySelector('.start__img');

    if (switcher) {
      img.src = '../assets/icons/load2.png';
    } else {
      img.src = '../assets/icons/start.png';
    }
  },
  toDefault() {
    this.switchText.textContent = 'play';
    this.showPlayTrain();
  },
  showResult(isSuccess) {
    if (isSuccess) {
      const isGameOver = forView.checkStars(this.starWrap.children);
      let doneElement;
      if (isGameOver) {
        doneElement = forView.createFinish('../assets/img/end/happy.jpg', 'Молодец!');
        this.reading('../assets/sounds/choice/success.mp3');
      } else {
        doneElement = forView.createFinish('../assets/img/end/sadness.jpg', 'Попробуй ещё!');
        this.reading('../assets/sounds/choice/failure.mp3');
      }
      document.body.insertAdjacentElement('beforeend', doneElement);
      this.wrapperCardsDiv.style.display = 'none';

      setTimeout(() => {
        this.wrapperCardsDiv.style.display = 'flex';
        doneElement.remove();
      }, 5000);
    }
  },
  showStatistics(cards) {
    const calls = localStorage.getItem('statistics');

    if (calls) {
      const parse = JSON.parse(calls);
      this.statisticsWrapper.insertAdjacentHTML('beforeend', parse);
    } else {
      const keys = Array.from(cards.keys());
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const array = cards.get(key);
        const normalKeyName = forView.createNormalCase(key);
        const groupHTML = forView.createCardInfoElement(normalKeyName, null, true);

        for (let j = 0; j < array.length; j++) {
          const cardInfo = array[j];
          const englishWord = cardInfo.getEnglishWord();
          const russianWord = cardInfo.getRussianWord();
          const textHTML = forView.createCardInfoElement(englishWord, russianWord);

          groupHTML.insertAdjacentHTML('beforeend', textHTML);
        }
        this.statisticsWrapper.insertAdjacentElement('beforeend', groupHTML);
      }
      const inner = this.statisticsWrapper.innerHTML.trim();
      const stringify = JSON.stringify(inner);
      localStorage.setItem('statistics', stringify);
    }
  },
  setCategory(name) {
    this.groupName.textContent = name;
    this.groupName.style.display = 'inline';
  },
  updateStatistics(name, columnName) {
    const infoElem = forView.searchElementStatistics(name, this.statisticsWrapper);
    const columnWrap = infoElem.querySelector(`.statistics__${columnName}`);

    if (columnName !== 'percent') {
      const num = +columnWrap.textContent;

      columnWrap.textContent = num + 1;
    } else {
      const hit = +infoElem.querySelector('.statistics__hit').textContent;
      const miss = +infoElem.querySelector('.statistics__miss').textContent;
      let res = `${(miss / (miss + hit)).toFixed(2)}%`;
      res = res.split('.');
      columnWrap.textContent = res.pop();
    }
    forView.saveGame('statistics', this.statisticsWrapper.innerHTML);
  },
  sortBy(nameSort) {
    this.sorting = this.sorting === 'up' ? 'down' : 'up';

    const name = nameSort;
    let allStatistics = this.statisticsWrapper.children;

    function sortByNum(first, second) {
      if (first.tagName === 'SPAN') return 0;
      if (second.tagName === 'SPAN') return 1;
      const info = first.querySelector(`.statistics__${name}`).textContent.match(/\d+/g);
      const info2 = second.querySelector(`.statistics__${name}`).textContent.match(/\d+/g);
      const num1 = +info.join('');
      const num2 = +info2.join('');

      if (this.sorting === 'up') {
        return num2 - num1;
      }
      return num1 - num2;
    }
    function sortByName(first, second) {
      if (first.tagName === 'SPAN') return 0;
      if (second.tagName === 'SPAN') return 1;

      const info = first.querySelector(`.statistics__${name}`).textContent.split(' ')[0];
      const info2 = second.querySelector(`.statistics__${name}`).textContent.split(' ')[0];

      if (this.sorting === 'up') {
        return info.charCodeAt() - info2.charCodeAt();
      }
      return info2.charCodeAt() - info.charCodeAt();
    }
    function sortGroupName(first, second) {
      const info = first.firstElementChild.textContent;
      const info2 = second.firstElementChild.textContent;

      if (this.sorting === 'up') {
        return info.charCodeAt() - info2.charCodeAt();
      }
      return info2.charCodeAt() - info.charCodeAt();
    }
    allStatistics = Array.from(allStatistics);

    if (name === 'name') {
      allStatistics.sort(sortGroupName.bind(this));
      forView.addAllChildren(this.statisticsWrapper, Array.from(allStatistics));
    }
    for (let i = 0; i < allStatistics.length; i++) {
      const group = Array.from(allStatistics[i].children);

      if (name === 'name') {
        forView.addAllChildren(allStatistics[i], group.sort(sortByName.bind(this)));
      } else {
        forView.addAllChildren(allStatistics[i], group.sort(sortByNum.bind(this)));
      }
    }
  },
  bindFoo(callbacks) {
    const {
      switchFoo, burgerMenuFoo, navFoo, pressCard, startGame, sortStatistics,
    } = callbacks;
    forView.bindEvent(this.switchToggle, 'click', switchFoo);
    forView.bindEvent(this.burgerMenu, 'click', burgerMenuFoo);
    forView.bindEvent(this.wrapperCardsDiv, 'click', pressCard);
    forView.bindEvent(this.startButton, 'click', startGame);
    forView.bindEvent(this.categories, 'click', sortStatistics);
    this.links.forEach((e) => forView.bindEvent(e, 'click', navFoo));
  },
};

export default view;
