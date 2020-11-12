'Use strict';

function sortGem(game) {
  let resultSequence = 0;
  const gameCopy = Array.from(game.children);
  for (let i = 0; i <= gameCopy.length - 1; i += 1) {
    for (let j = i + 1; j <= gameCopy.length - 1; j += 1) {
      if (+gameCopy[i].textContent > +gameCopy[j].textContent) {
        resultSequence += 1;
      }
    }
  }
  return resultSequence % 2 === 0;
}

export default sortGem;
