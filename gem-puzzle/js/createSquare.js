"Use strict";

function createSquare (srcImg, number, classForSq = 'square', pos = {}, sizeImg, sizeSq) {
    if (pos.x === undefined || pos.y === undefined) throw new Error('need object with keys x and y position for img');
    
    const squareWrapper = document.createElement('div');
    squareWrapper.style.cssText = `position: relative;
                                   width: ${sizeSq}px;
                                   height: ${sizeSq}px;
                                   margin: 0.1rem;`;

    const square = document.createElement('div');
    squareWrapper.insertAdjacentElement('beforeend', square);

    square.textContent = number;

    square.classList.add(classForSq);
    square.style.cssText = `position: absolute;
                            width: ${sizeSq}px;
                            height: ${sizeSq}px;
                            background: no-repeat url(${srcImg});
                            background-position: ${pos.x}px ${pos.y}px;
                            background-size: ${sizeImg}px
                            transition: .5s;`;
    square.setAttribute('data-number', number);

    return squareWrapper;
}

export {createSquare};