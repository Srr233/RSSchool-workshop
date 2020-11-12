import createBoard from './createBoard.js';
import sortGem from './sortGem.js';
import saveGame from './saveGame.js';

let game;
let value;
const refresh = new Audio('assets/sounds/refresh.mp3');
const records = localStorage.getItem('records');
const ol = document.querySelector('.leaders__ol');
if (records) {
  const parse = JSON.parse(records);
  ol.insertAdjacentHTML('beforeend', parse);
}
const container = document.querySelector('.container');

const size = function getAdaptiveSize(numSquares) {
  const sizeContainer = container.getBoundingClientRect();
  const sizeMenu = document.querySelector('.score-wrapper').getBoundingClientRect();
  let width = (sizeContainer.width - sizeContainer.width * 0.10) - sizeMenu.height;
  const top = (sizeContainer.height - sizeContainer.height * 0.10 - 10) - sizeMenu.height;

  if (sizeContainer.width < 450) {
    width = (sizeContainer.width - sizeContainer.width * 0.10);
    return width / numSquares;
  }
  return Math.min(width, top) / numSquares;
};

const reload = function reloadGame() {
  if (game) {
    refresh.play();
    window.clearTimeout(game.reloadTime());
    document.querySelector('.win').classList.remove('done');
  }
  document.querySelector('.score__move').firstElementChild.textContent = 0;
  value = document.querySelector('.score__select').value;

  if (container.firstElementChild) container.firstElementChild.remove();
  const img = (Math.random() * 151).toFixed(0);
  game = createBoard(+value, size(+value), `assets/img/${img < 1 ? 1 : img}.jpg`);
  if (!sortGem(game.game, +value)) {
    reload();
    return;
  }
  container.insertAdjacentElement('beforeend', game.game);
};
const openCloseMenu = function showMenu(e) {
  const menu = document.querySelector('.wrapper-menu');
  const modal = document.querySelector('.leaders');

  if (modal.classList.contains('open') && e.target.textContent === 'close') {
    e.target.textContent = 'menu';
    modal.classList.remove('open');
    modal.classList.add('close');
    return;
  }
  if (e.target.textContent === 'Leaders') {
    modal.classList.remove('close');
    modal.classList.add('open');
    menu.classList.remove('open');
    menu.classList.add('close');
  } else if (menu.classList.contains('open') && e.target.textContent !== 'menu') {
    e.target.textContent = 'menu';
    menu.classList.remove('open');
    menu.classList.add('close');
  } else {
    e.target.textContent = 'close';
    menu.classList.remove('close');
    menu.classList.add('open');
  }
};
reload();
let data = Date.now();
document.querySelector('.menu-button').addEventListener('click', openCloseMenu);
document.querySelector('.menu__leaders').addEventListener('click', openCloseMenu);
document.querySelector('.score__reload').addEventListener('click', reload);
document.querySelector('.score__select').addEventListener('change', reload);
document.querySelector('.menu__finish').addEventListener('click', () => game.makeFinish());
document.querySelector('.gem-puzzle-wrapper').addEventListener('click', (e) => {
  const now = Date.now();
  if (now - data < 350) {
    e.stopPropagation();
  } else {
    data = now;
  }
}, true);
const getNormalTime = function timeNormal(time) {
  if (time[0] === '0') {
    return time[1];
  } return time;
};
const time = document.querySelector('.score__time');
document.querySelector('.win__close').addEventListener('click', game.closeFinish);
document.querySelector('.menu__save').addEventListener('click', () => {
  const valueTime = document.querySelector('.score__select').value;
  const saved = document.querySelector('.save');
  const move = document.querySelector('.score__move');

  game.timeMove.time = [getNormalTime(time.firstElementChild.textContent),
    getNormalTime(time.lastElementChild.textContent)];
  game.timeMove.move = move.firstElementChild.textContent;

  saveGame(document.querySelector('.container'), +valueTime, size(+valueTime), game.lastElem, game.mapMove, game.timeMove);
  saved.classList.add('open');
  setTimeout(() => saved.classList.remove('open'), 2500);
});
document.querySelector('.menu__load').addEventListener('click', () => {
  if (localStorage.getItem('game')) {
    container.firstElementChild.remove();
    const contain = document.createElement('div');
    const sizes = JSON.parse(localStorage.getItem('sizes'));
    const lastElem = document.createElement('div');
    const mapMove = JSON.parse(localStorage.getItem('mapMove'));
    document.querySelector('.score__select').value = sizes.size;
    contain.innerHTML = localStorage.getItem('game');
    lastElem.innerHTML = localStorage.getItem('lastElem');
    const optionsSave = {
      contain,
      lastElem,
      mapMove
    };
    clearTimeout(game.timeout.id);
    game = createBoard(sizes.size, sizes.sizeSq, '', optionsSave);
    const parseTimeMove = JSON.parse(localStorage.getItem('timeMove'));
    const first = time.firstElementChild;
    const last = time.lastElementChild;
    if (parseTimeMove) {
      game.timeMove.time = [parseTimeMove.time[0], parseTimeMove.time[1]];
      first.textContent = game.timeMove.time[0].length < 2 ? 0 + game.timeMove.time[0]
        : game.timeMove.time[0];
      last.textContent = game.timeMove.time[1].length < 2 ? 0 + game.timeMove.time[1]
        : game.timeMove.time[1];
      game.timeMove.move = parseTimeMove.move;
      document.querySelector('.score__move').firstElementChild.textContent = parseTimeMove.move;
    }
    refresh.play();
    container.insertAdjacentElement('beforeend', game.game);
  }
});
