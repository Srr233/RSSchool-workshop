'use strict';

import { forCard } from './services.js';

class Card {
  constructor(img, group, russian, english, sound) {
    this.img = img;
    this.group = group;
    this.russianWord = russian;
    this.englishWord = english;
    this.currentLanguage = english;
    this.linkImg = forCard.createLinkImg(img, group);
    this.linkSound = forCard.createLinkSound(sound, group);
  }

  getNumberImg() {
    return this.img;
  }

  getLinkImg() {
    return this.linkImg;
  }

  getLinkSound() {
    return this.linkSound;
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
