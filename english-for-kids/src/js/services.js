'use strict';

const forCard = {
  createLinkImg(numberImg, group) {
    let num;
    if (numberImg.toString().length < 2) {
      num = `0${numberImg}`;
    }
    return `../assets/img/${group}/${num}.jpg`;
  },
  createLinkSound(numberSound, group) {
    let num;
    if (numberSound.toString().length < 2) {
      num = `0${numberSound}`;
    }
    return `../assets/sounds/${group}/${num}.mp3`;
  },
};

const forModel = {

};

const forView = {
  getCurrentElemCard(target) {
    let elementCard = target;

    while (elementCard.tagName !== 'ARTICLE' && elementCard !== null) {
      elementCard = elementCard.parentElement;
    }
    if (elementCard === null) {
      throw new Error('Element card not found!');
    }
    return elementCard;
  },
  clearChildren(element) {
    const length = element.childElementCount;
    if (!length) return;
    for (let i = 0; i < length; i++) {
      element.firstElementChild.remove();
    }
  },
  bindEvent(element, eventName, callback) {
    element.addEventListener(eventName, callback);
  },
  createElement(typeCard, linkImg, englishWord, nameCard) {
    const wrapperCard = document.createElement('div');
    let contains;

    if (typeCard === 'group') {
      contains = `      <article class="card">
                        <div class="card__img-wrapper">
                            <img src="${linkImg}" alt="${englishWord}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${nameCard}</span>
                        </div>
                        </article>`;
    } else if (typeCard === 'card') {
      contains = `      <article class="card">
                        <div class="card__img-wrapper">
                            <img src="${linkImg}" alt="${englishWord}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${nameCard}</span>
                            <button class="card__load-wrap">
                                <img src="../assets/icons/load.jpg" alt="loader" class="card__load-img">
                            </button>
                        </div>
                        </article>`;
    } else {
      throw new Error('Argument typeCard should be only group or card string!');
    }
    wrapperCard.insertAdjacentHTML('beforeend', contains);
    return wrapperCard;
  },
};

function createCamelCase(text) {
  let res = text.toLowerCase().split(' ');

  if (res.length > 1) {
    res = res.map((val, index) => (index ? val[0].toUpperCase() + val.slice(1)
      : val));
  }
  return res.join('');
}

const forController = {
  getName(target) {
    let elementCard = target;

    if (elementCard.tagName === 'A') {
      return createCamelCase(elementCard.textContent);
    }

    while (elementCard !== null && elementCard.tagName !== 'ARTICLE') {
      elementCard = elementCard.parentElement;
    }
    if (elementCard === null) {
      throw new Error('Element card not found!');
    }
    return elementCard.querySelector('.card__text').textContent;
  },
};

export {
  forCard, forModel, forView, forController,
};
