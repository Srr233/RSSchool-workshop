import {createBoard} from "./createBoard.js";
import {sortGem} from "./sortGem.js";

"Use strict";
let game;
//change image button
const container = document.querySelector('.container');

const size = function (numSquares) {
    const sizeContainer = container.getBoundingClientRect();
    const sizeMenu = document.querySelector('.score-wrapper').getBoundingClientRect();
    let width = (sizeContainer.width - sizeContainer.width * 0.10) - sizeMenu.height;
    let top = (sizeContainer.height - sizeContainer.height * 0.10 - 10) - sizeMenu.height; 

    if(sizeContainer.width < 450) {
        width = (sizeContainer.width - sizeContainer.width * 0.10);
        return width / numSquares;
    }
    return Math.min(width, top) / numSquares;
}

const reload = function () {
    if (game) {
        window.clearTimeout(game.reloadTime());
        document.querySelector('.win').classList.remove('done');
    }
    document.querySelector('.score__move').firstElementChild.textContent = 0;
    const value = document.querySelector('.score__select').value;

    if (container.firstElementChild) container.firstElementChild.remove();
    game = createBoard(+value, size(+value), `assets/img/${(Math.random() * 151).toFixed(0)}.jpg`);
    container.insertAdjacentElement("beforeend", game.game);
    if(!sortGem(game.game, +value)) {
        reload();
    };
}
reload();

const openCloseMenu = function () {
    const menu = document.querySelector('.wrapper-menu');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.classList.add('close');
    } else {
        menu.classList.remove('close');
        menu.classList.add('open');
    }
}
document.querySelector('.menu-button').addEventListener('click', openCloseMenu);
document.querySelector('.score__reload').addEventListener('click', reload);
document.querySelector('.score__select').addEventListener('change', reload);
document.querySelector('.win__close').addEventListener('click', game.closeFinish);


