import {createSquare} from "./createSquare.js";
import {moveSquare} from "./moveSquare.js";
import { counterMove } from "./counterMove.js";

"Use strict";

function createBoard (size = 3, sizeSq = 100, imgSrc, savedGame) {
    if (typeof size !== 'number') throw new Error ('Size is number! for example 4 => 4x4');
    
    let count = 0;
    let move = 0;
    let wrappersElem = [];
    let mapMove = [];
    const howManyPx = sizeSq * size;
    const game = document.createElement('div');
    let lastElem;

    game.classList.add('gem-puzzle-wrapper');
    game.style.gridTemplateColumns = '1fr '.repeat(size);

    if (typeof savedGame === "object") {
        Array.from(savedGame.contain.children[0].children).forEach(squareWrapper => {
            let data = Date.now();
            const stop = e => {
                const now = Date.now();
                if (now - data < 500) {
                    e.stopPropagation();
                } else {
                    data = now;
                }
            }
            squareWrapper.lastElementChild.addEventListener('click', stop);
            wrappersElem.push(squareWrapper);
        });
        lastElem = savedGame.lastElem;
        mapMove = savedGame.mapMove;
        for (let i = 0; i < wrappersElem.length; i++) {
            game.insertAdjacentElement("beforeend", wrappersElem[i]);
        }
    } else {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                count++; 
                wrappersElem.push(createSquare(imgSrc, count, 'square', { x: -x * sizeSq, y: -y * sizeSq }, howManyPx, sizeSq));
            }
        }
        
            lastElem = wrappersElem.pop();

            wrappersElem = wrappersElem.sort(() => Math.random() - Math.random());
        
        let row = [];
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
    }
    let infoFinish = {};
    const finish = () => {
        document.querySelector('.win__times').textContent = allTime;
        document.querySelector('.win__moves').textContent = `${move}`;
        document.querySelector('.win').classList.add('done');

        infoFinish = {
            move,
            size: document.querySelector('.score__select').value
        }
        const leaders = document.querySelector('.leaders__ol');
        leaders.insertAdjacentHTML('beforeend', `<li class="leaders__li">
                                                    <span>${move}&nbsp;</span>
                                                    <span>${infoFinish.size}x${infoFinish.size}</span>
                                                    </li>`);
        const leadersUp = Array.from(leaders.children);
        leadersUp.sort((a, b) => a.firstElementChild.textContent.trim() - b.firstElementChild.textContent.trim());
        
        while(leadersUp.length > 10) {
            leadersUp.pop()
        }
        for (let i of leaders.children) {
            i.remove();
        }
        for (let i of leadersUp) {
            leaders.insertAdjacentElement('beforeend', i);
        }

        localStorage.setItem('records', JSON.stringify(leaders.innerHTML));
        
        game.appendChild(lastElem);
        for (let i of game.children) {
            i.children[0].querySelector('.square__num').remove();
        }
        game.removeEventListener('click', mapGo);
        game.classList.add('finish');
        Array.from(game.children).forEach(el => el.classList.remove('square'));
        startGame = !startGame;
        minutes = '0';
        seconds = '-1';
    }
    const makeFinish = () => {
        const computedStyles = {
            currentPlace: {},
            wrongPlace: {}
        };
        let goodCurrentElem;
        let notGoodCurrentElem;
        for (let i = 0; i < game.children.length; i++) {
            goodCurrentElem = document.querySelector(`[data-number="${i + 1}"]`);
            notGoodCurrentElem = game.children[i];

            computedStyles.currentPlace = notGoodCurrentElem.getBoundingClientRect();
            computedStyles.wrongPlace = goodCurrentElem.parentNode.getBoundingClientRect();

            goodCurrentElem.style.top = computedStyles.currentPlace.top - computedStyles.wrongPlace.top + "px";
            goodCurrentElem.style.left = computedStyles.currentPlace.left - computedStyles.wrongPlace.left + "px";

            finish();
        }
    }
    let startGame = false;
    let minutes = 0;
    let seconds = 0;
    let allTime = '';
    const timeout = {
        id: 0
    }
    const timeMove = {
        time: null,
        move: null
    }
    const timeWrap = document.querySelector('time');
    const startTime = function () {

        if (startGame) {
            timeout.id = setTimeout(startTime, 1000);
        } else {
            return;
        }
        
        if (timeMove.time) {
            minutes = timeMove.time[0];
            seconds = timeMove.time[1];
        }
        if (+seconds < 59) {
            timeWrap.children[0].textContent = minutes.toString().length < 2 ? `0${minutes}` : minutes;
            timeWrap.children[1].textContent = seconds.toString().length < 2 ? `0${++seconds}` : ++seconds;
        } else {
            seconds = 0;
            timeWrap.children[0].textContent = minutes.toString().length < 2 ? `0${++minutes}` : ++minutes;
            timeWrap.children[1].textContent = seconds.toString().length < 2 ? `0${seconds}` : seconds;
        }
        if (timeMove.time) {
            timeMove.time[0] = minutes;
            timeMove.time[1] = seconds;
        }
        allTime = `${timeWrap.children[0].textContent}:${timeWrap.children[1].textContent}`;
    }
    const reloadTime = () => {
        timeWrap.children[0].textContent = '00';
        timeWrap.children[1].textContent = '00';
        return timeout.id;
    }
    const closeFinish = () => {
        document.querySelector('.win').classList.remove('done');
    }
    let isLoad = true;
    const mapGo = e => {
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
            if (!startGame) {
                startGame = !startGame;
                startTime();
            }
            if (timeMove.move && isLoad) {
                move = timeMove.move;
                isLoad = false;
            }
            counterMove(++move);
            if (posNothing !== -1) {
                if (posNothing < elemPos.index) {
                    elemPos.direction = "left";
                } else elemPos.direction = "right";
            } else {
                if (elemPos.arrNothing < elemPos.arr) {
                    elemPos.direction = "up";
                } else elemPos.direction = "down";
            }
            if (moveSquare(mapMove, elemPos, sizeSq)) {
                finish();
            }
        }
    };

    game.addEventListener('click', mapGo);
    return {
        game,
        makeFinish,
        reloadTime,
        closeFinish,
        lastElem,
        mapMove,
        infoFinish,
        timeMove,
        timeout
    }
}

export {createBoard};
