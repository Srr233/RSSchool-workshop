'use strict';

import { forCard } from './services.js';

class Card {
  constructor(img, group, russian, english) {
    this.play = false;
    this.reversed = false;
    this.img = img;
    this.group = group;
    this.russianWord = russian;
    this.englishWord = english;
    this.currentLanguage = english;
    this.linkImg = forCard.createLink(img, group);
  }

  getNumberImg() {
    return this.img;
  }

  getLinkImg() {
    return this.linkImg;
  }

  changeLanguage() {
    this.currentLanguage = this.currentLanguage === this.englishWord ? this.russianWord
      : this.englishWord;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getEnglishWord() {
    return this.englishWord;
  }

  getRussianWord() {
    return this.russianWord;
  }
}

export default Card;
