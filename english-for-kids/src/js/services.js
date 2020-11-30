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

function createNormalCase(text) {
  const normalText = text.trim();
  let res = '';
  let copy = normalText;
  const isUpLetter = copy.match(/[A-Z]/);

  if (isUpLetter) {
    for (let i = 0; i < normalText.length; i++) {
      if (normalText[i].toUpperCase() === normalText[i] && normalText[i] !== ' ') {
        res += `${copy.slice(0, i)} `;
        copy = copy.slice(i);
      }
    }
    res += copy;
    res = res.toLowerCase().trim();
    res = res[0].toUpperCase() + res.slice(1);
  } else {
    res = copy;
    res = res[0].toUpperCase() + res.slice(1);
  }
  return res;
}

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
  createElement(typeCard, linkImg, englishWord, name) {
    const nameCard = createNormalCase(name);
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
  createStar(isCorrect) {
    const wrapperCard = document.createElement('div');
    wrapperCard.classList.add('start__stars-img-wrap');
    let contains;

    if (isCorrect) {
      contains = '<img src="../assets/icons/correct.jpg" alt="not correct" class="start__stars-img">';
    } else {
      contains = '<img src="../assets/icons/notCorrect.jpg" alt="not correct" class="start__stars-img">';
    }
    wrapperCard.insertAdjacentHTML('beforeend', contains);
    return wrapperCard;
  },
  howManyLength(selector) {
    const elements = document.querySelectorAll(selector);
    return elements.length;
  },
};

function createCamelCase(text) {
  let res = text.trim().toLowerCase().split(' ');

  if (res.length > 1) {
    res = res.map((val, index) => (index ? val[0].toUpperCase() + val.slice(1)
      : val));
  }
  return res.join('');
}
function searchCurrentCard(target) {
  if (target.tagName === 'A') {
    return target;
  }
  let elementCard = target;

  while (elementCard !== null && elementCard.tagName !== 'ARTICLE') {
    elementCard = elementCard.parentElement;
  }
  if (elementCard === null) {
    throw new Error('Element card not found!');
  }

  return elementCard;
}
const forController = {
  getNormalCaseName(target) {
    const currentCard = searchCurrentCard(target);
    return createNormalCase(currentCard.textContent);
  },
  getCamelCaseName(target) {
    const currentCard = searchCurrentCard(target);
    return createCamelCase(currentCard.textContent);
  },
  getCurrentElemCard: searchCurrentCard,
};

export {
  forCard, forModel, forView, forController,
};
