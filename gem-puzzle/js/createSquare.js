"Use strict";

function createSquare (srcImg, number, classForSq = 'square', classForImg = 'cut-img') {
    if (!srcImg) throw new Error ("need src for image!");
    
    const square = document.createElement('div');
    const img = document.createElement('img');

    img.classList.add(classForImg)
    square.classList.add(classForSq);

    square.setAttribute('data-number', number);
    img.src = srcImg;

    square.appendChild(img);

    return square;
}

export {createSquare};