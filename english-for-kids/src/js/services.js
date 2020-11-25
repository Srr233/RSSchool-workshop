'use strict';

const forCard = {
  createLink(numberImg, group) {
    let num;
    if (numberImg.toString().length < 2) {
      num = `0${numberImg}`;
    }
    return `../assets/img/${group}/${num}.jpg`;
  },
};

const forModel = {

};

const forView = {
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
    const wrapperCard = document.createElement('article');
    wrapperCard.classList.add('card');
    let contains;

    if (typeCard === 'group') {
      contains = `      <div class="card__img-wrapper">
                            <img src="${linkImg}" alt="${englishWord}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${nameCard}</span>
                        </div>`;
    } else if (typeCard === 'card') {
      contains = `      <div class="card__img-wrapper">
                            <img src="${linkImg}" alt="${englishWord}" class="card__img">
                        </div>
                        <div class="word-wrap">
                            <span class="card__text">${nameCard}</span>
                            <button class="card__load-wrap">
                                <img src="../assets/icons/load.jpg" alt="loader" class="card__load-img">
                            </button>
                        </div>`;
    } else {
      throw new Error('Argument typeCard should be only group or card string!');
    }
    wrapperCard.insertAdjacentHTML('beforeend', contains);
    return wrapperCard;
  },
};

const forController = {
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
};

export {
  forCard, forModel, forView, forController,
};
