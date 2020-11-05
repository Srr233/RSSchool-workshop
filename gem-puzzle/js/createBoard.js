import {createSquare} from "./createSquare.js";
import {moveSquare} from "./moveSquare.js";

"Use strict";

function createBoard (size = 3, sizeSq = 100, imgSrc) {
    if (typeof size !== 'number') throw new Error ('Size is number! for example 4 => 4x4');
    
    let count = 0;
    let wrappersElem = [];
    const mapMove = [];
    const howManyPx = sizeSq * size;
    const game = document.createElement('div');

    game.classList.add('gem-puzzle-wrapper');
    game.style.gridTemplateColumns = '1fr '.repeat(size);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            count++; 
            wrappersElem.push(createSquare(imgSrc, count, 'square', { x: -x * sizeSq, y: -y * sizeSq }, howManyPx, sizeSq));
        }
    }
    const lastElem = wrappersElem.pop();

    wrappersElem = wrappersElem.sort(() => Math.random() - Math.random());
    let row  = [];

    for (let i = 0; i < wrappersElem.length; i++) {
        game.insertAdjacentElement("beforeend", wrappersElem[i]);

        if (row.length < size) {
            row.push(wrappersElem[i].children[0].dataset.number);
        } else {
            mapMove.push(row.slice(0));
            row = [wrappersElem[i].children[0].dataset.number];
        }
    }
    if (row.length) {
        row.push('-');
        mapMove.push(row);
    }

    const addLastElem = function () {
        if (game.children[game.children.length -1] === lastElem) {
            throw new Error ("lastElem has already append to game!");
        } else game.appendChild(lastElem);
    }
    game.addEventListener('click', e => {
        //only ONE click for square
        const target = e.target;
        if (!target.classList.contains('square')) return;
        let elemPos = {
            arr: 0,
            index: 0,
            distance: 0,
            direction: '',
            arrNothing: 0,
            indexNothing: 0
        }
        let isMove = false;
        im: for (let arr = 0; arr < mapMove.length; arr++) {
                for (let elem = 0; elem < mapMove[arr].length; elem++) {
                    if (mapMove[arr][elem] === target.dataset.number) {
                        elemPos.index = elem;
                        elemPos.arr = arr;
                        break im;
                    }
                }
            }
        const posNothing = mapMove[elemPos.arr].indexOf('-');

        if (posNothing === -1) {
            im: for (let arr = 0; arr < mapMove.length; arr++) {
                    if (mapMove[arr][elemPos.index] === '-') {
                        isMove = true;
                        elemPos.distance = Math.max(arr, elemPos.arr) - Math.min(arr, elemPos.arr);
                        elemPos.arrNothing = arr;
                        elemPos.indexNothing = elemPos.index;
                        break im;
                    };
                }
        } else {
            elemPos.distance = Math.max(posNothing, elemPos.index) - Math.min(posNothing, elemPos.index);
            elemPos.indexNothing = posNothing;
            isMove = true;
        }

        
            if (isMove) {
                if (posNothing !== -1) {
                    if (posNothing < elemPos.index) {
                        elemPos.direction = "left";
                    } else elemPos.direction = "right";
                } else {
                    if (elemPos.arrNothing < elemPos.arr) {
                        elemPos.direction = "up";
                    } else elemPos.direction = "down";
                }
                if(moveSquare(mapMove, elemPos, sizeSq)) {
                    addLastElem();
                    for (let i of game.children) {
                        i.children[0].textContent = '';
                    }
                    game.classList.add('finish');
                }
            }
    });
    return {
        game,
        addLastElem,
    }
}

export {createBoard};
