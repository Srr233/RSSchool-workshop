"Use strict";

function createSquare (srcImg, number, classForSq = 'square', pos = {}) {
    if (!pos.x || !pos.y) throw new Error('need object with keys x and y position for img');

    const square = document.createElement('div');

    square.classList.add(classForSq);
    square.style.background = `url(${srcImg})`;
    square.style.backgroundPosition = `${pos.x}% ${pos.y}%`;
    square.setAttribute('data-number', number);

    return square;
}

export {createSquare};