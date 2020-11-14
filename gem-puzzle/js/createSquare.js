'Use strict';

function createSquare(srcImg, number, classForSq = 'square', pos = {}, sizeImg, sizeSq) {
  if (pos.x === undefined || pos.y === undefined) throw new Error('need object with keys x and y position for img');

  const squareWrapper = document.createElement('div');
  squareWrapper.style.cssText = `position: relative;
                                   width: ${sizeSq}px;
                                   height: ${sizeSq}px;
                                   `;

  const square = document.createElement('div');
  squareWrapper.insertAdjacentElement('beforeend', square);

  square.insertAdjacentHTML('beforeend', `<span class="square__num">${number}</span>`);

  square.classList.add(classForSq);
  square.style.position = 'absolute';
  square.style.top = 0;
  square.style.left = 0;
  square.style.width = `${sizeSq}px`;
  square.style.height = `${sizeSq}px`;
  square.style.backgroundImage = `url(${srcImg})`;
  square.style.backgroundRepeat = 'no-repeat';
  square.style.backgroundPosition = `${pos.x}px ${pos.y}px`;
  square.style.backgroundSize = `${sizeImg}px`;
  square.style.zIndex = 40;
  square.style.transition = '.5s';
  square.setAttribute('data-number', number);
  let data = Date.now();

  const stop = (e) => {
    const now = Date.now();
    if (now - data < 500) {
      e.stopPropagation();
    } else {
      data = now;
    }
  };

  square.addEventListener('click', stop);

  return squareWrapper;
}

export default createSquare;
