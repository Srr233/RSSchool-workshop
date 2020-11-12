'Use strict';

function moveSquare(map, options, sizeSq) {
  const move = [];
  const moveDOM = [];
  const mapUse = map;
  let temp1;
  let temp2;
  switch (options.direction) {
    case 'up':
      temp1 = map[options.arr][options.index];
      mapUse[options.arr][options.index] = '-';
      for (let i = options.arr - 1; i > options.arrNothing - 1; i -= 1) {
        temp2 = map[i][options.indexNothing];
        mapUse[i][options.indexNothing] = temp1;
        move.push(temp1);
        temp1 = temp2;
      }
      break;
    case 'down':
      temp1 = map[options.arr][options.index];
      mapUse[options.arr][options.index] = '-';
      for (let i = options.arr + 1; i < options.arrNothing + 1; i += 1) {
        temp2 = map[i][options.indexNothing];
        mapUse[i][options.indexNothing] = temp1;
        move.push(temp1);
        temp1 = temp2;
      }
      break;
    case 'left':
      temp1 = map[options.arr][options.index];
      mapUse[options.arr][options.index] = '-';
      for (let i = options.index - 1; i > options.indexNothing - 1; i -= 1) {
        temp2 = map[options.arr][i];
        mapUse[options.arr][i] = temp1;
        move.push(temp1);
        temp1 = temp2;
      }
      break;
    case 'right':
      temp1 = map[options.arr][options.index];
      mapUse[options.arr][options.index] = '-';
      for (let i = options.index + 1; i < options.indexNothing + 1; i += 1) {
        temp2 = map[options.arr][i];
        mapUse[options.arr][i] = temp1;
        move.push(temp1);
        temp1 = temp2;
      }
      break;
    default:
      throw new Error('Not found direction');
  }

  for (let i = 0; i < move.length; i += 1) {
    moveDOM.push(document.querySelector(`[data-number="${move[i]}"]`));
  }

  const isSequence = (arr, num) => {
    let prev = +num;

    for (let i = 0; i < arr.length; i += 1) {
      if (prev + 1 === +arr[i]) {
        prev += 1;
      } else if (+arr[i + 1] !== '-' && arr[i + 1] !== undefined) {
        return false;
      }
    }
    return true;
  };
  moveDOM.forEach((elem) => {
    const element = elem;
    const styles = window.getComputedStyle(elem, null);
    const pos = {
      top: +styles.top.slice(0, -2),
      left: +styles.left.slice(0, -2)
    };
    switch (options.direction) {
      case 'up':
        element.style.top = `${pos.top - sizeSq}px`;
        break;
      case 'down':
        element.style.top = `${pos.top + sizeSq}px`;
        break;
      case 'left':
        element.style.left = `${pos.left - sizeSq}px`;
        break;
      case 'right':
        element.style.left = `${pos.left + sizeSq}px`;
        break;
      default:
        throw new Error('Not found direction for position');
    }
  });
  const isFinish = (() => {
    let next = 0;
    for (let i = 0; i < map.length; i += 1) {
      if (isSequence(map[i], next)) {
        next = map[i][map[i].length - 1];
      } else return false;
    }
    return true;
  })();
  return isFinish;
}

export default moveSquare;
