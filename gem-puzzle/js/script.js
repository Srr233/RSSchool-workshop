import {createBoard} from "./createBoard.js";

"Use strict";
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
let game = createBoard(3, 100, "assets/img/100.jpg");
container.insertAdjacentElement("beforeend", game.game);

const reload = function () {
    document.querySelector('.score__move').firstElementChild.textContent = 0;
    const value = document.querySelector('.score__select').value;
    container.firstElementChild.remove();
    game = createBoard(+value, size(+value), "assets/img/100.jpg");
    container.insertAdjacentElement("beforeend", game.game);
}
reload();
document.querySelector('.score__reload').addEventListener('click', reload);
document.querySelector('.score__select').addEventListener('change', reload);


