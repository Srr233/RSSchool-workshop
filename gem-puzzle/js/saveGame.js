"Use strict";

function saveGame (game, size, sizeSq, lastElem, mapMove, timeMove) {
    localStorage.setItem('game', game.innerHTML);
    localStorage.setItem('sizes', JSON.stringify({size, sizeSq}));
    localStorage.setItem('lastElem', lastElem.outerHTML);
    localStorage.setItem('mapMove', JSON.stringify(mapMove));
    localStorage.setItem('timeMove', JSON.stringify(timeMove));
}

export {saveGame};