"Use strict";

function createSquare (srcImg, number, classForSq = 'square', pos = {}, sizeRem) {
    if (pos.x === undefined || pos.y === undefined) throw new Error('need object with keys x and y position for img');

    const square = document.createElement('div');

    square.classList.add(classForSq);
    square.style.cssText = `background: url(${srcImg});
                            background-position: ${pos.x}% ${pos.y}%;
                            background-size: ${sizeRem}rem`;
    square.setAttribute('data-number', number);

    return square;
}

export {createSquare};