"Use strict";

function saveGame (game, size, sizeSq, lastElem, mapMove) {
    localStorage.setItem('game', game.innerHTML);
    localStorage.setItem('sizes', JSON.stringify({size, sizeSq}));
    localStorage.setItem('lastElem', lastElem.outerHTML);
    localStorage.setItem('mapMove', JSON.stringify(mapMove));
}

export {saveGame};