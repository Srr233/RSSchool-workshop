"Use strict";

function createSquare (srcImg, number, classForSq = 'square', pos = {}, sizeRem) {
    if (pos.x === undefined || pos.y === undefined) throw new Error('need object with keys x and y position for img');

    const square = document.createElement('div');

    square.classList.add(classForSq);
    square.style.cssText = `background: no-repeat url(${srcImg});
                            background-position: ${pos.x}px ${pos.y}px;
                            background-size: ${sizeRem}px`;
    square.setAttribute('data-number', number);

    return square;
}

export {createSquare};