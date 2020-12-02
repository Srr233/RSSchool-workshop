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

function getNormalCaseName(target) {
  const currentCard = searchCurrentCard(target);
  return createNormalCase(currentCard.textContent);
}
function getCamelCaseName(target) {
  const currentCard = searchCurrentCard(target);
  return createCamelCase(currentCard.textContent);
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
    const wrapperStar = document.createElement('div');
    wrapperStar.classList.add('start__stars-img-wrap');
    let contains;

    if (isCorrect) {
      wrapperStar.dataset.correct = true;
      contains = '<img src="../assets/icons/correct.jpg" alt="correct" class="start__stars-img">';
    } else {
      contains = '<img src="../assets/icons/notCorrect.jpg" alt="not correct" class="start__stars-img">';
    }
    wrapperStar.insertAdjacentHTML('beforeend', contains);
    return wrapperStar;
  },
  createNormalCase,
  createCardInfoElement(englishName, russianName, newGroup) {
    let contains;
    if (newGroup) {
      contains = `<div class="statistics__cardInfo color">
                      <span class="statistics__name">${englishName}</span>
                  </div>`;
    } else {
      contains = `<div class="statistics__cardInfo">
                      <span class="statistics__name">${englishName} / ${russianName}</span>
                      <span class="statistics__asked">0</span>
                      <span class="statistics__hit">0</span>
                      <span class="statistics__miss">0</span>
                      <span class="statistics__percent">0</span>
                      <span class="statistics__train">0</span>
                  </div>`;
    }

    return contains;
  },
  createFinish(imgLink, text) {
    const wrapperFinish = document.createElement('div');
    wrapperFinish.classList.add('end');

    const contains = `<div class="end__img-wrap">
                          <img src="${imgLink}" alt="happy" class="end__img">
                      </div>
                      <span class="end__text">
                          ${text}
                      </span>
    `;

    wrapperFinish.insertAdjacentHTML('beforeend', contains);
    return wrapperFinish;
  },
  checkEnd(cards) {
    const children = Array.from(cards);
    return children.every((e) => e.firstElementChild.classList.contains('correct'));
  },
  checkStars(stars) {
    const children = Array.from(stars);
    return children.every((e) => {
      const a = e.dataset.correct !== undefined;
      return a;
    });
  },
  howManyLength(selector) {
    const elements = document.querySelectorAll(selector);
    return elements.length;
  },
};
const forController = {
  getNormalCaseName,
  getCamelCaseName,
  getCurrentElemCard: searchCurrentCard,
};

export {
  forCard, forModel, forView, forController,
};
