"Use strict";

function sortGem (game) {
    let resultSequence = 0;
    const gameCopy = Array.from(game.children);
    for (let i = 0; i <= gameCopy.length - 1; i++) {
        for (let j = i + 1; j <= gameCopy.length - 1; j++) {
            if (+gameCopy[i].textContent > +gameCopy[j].textContent) {
                resultSequence += 1;
            }
        }
    }
    console.log(resultSequence)
    return resultSequence % 2 === 0 ? true : false;
}

export {sortGem};