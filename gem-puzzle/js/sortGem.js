"Use strict";

function sortGem (game, size) {
    let resultSequence = 0;
    const gameCopy = Array.from(game.children);
    gameCopy.reduce((a, b, index) => {
        if (+a.children[0].dataset.number > +b.children[0].dataset.number) {
            const slice = gameCopy.slice(index);
            im: for (let i = 0; i < slice.length; i++) {
                if (+a.children[0].dataset.number > +slice[i].children[0].dataset.number) {
                    resultSequence++;
                } else break im;
            }
        }
        return b;
    });
    if (size % 2 !== 0) {
        if (resultSequence % 2 !== 0) {
            return false;
        } else return true;
    } else {
        if (resultSequence % 2 === 0) {
            return false;
        } else return true;
    }
}

export {sortGem};