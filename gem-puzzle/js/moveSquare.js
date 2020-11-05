"Use strict";

function moveSquare (map, options, sizeSq) {
    //change map
    const refreshMap = [];
    const move = [];
    const moveDOM = [];
    let temp1;
    let temp2;
    switch (options.direction) {
        case "up":
            temp1 = map[options.arr][options.index];
            map[options.arr][options.index] = "-";
            for (let i = options.arr - 1; i > options.arrNothing - 1; i--) {
                temp2 = map[i][options.indexNothing];
                map[i][options.indexNothing] = temp1;
                move.push(temp1);
                temp1 = temp2;
            }
            break;
        case "down":
            temp1 = map[options.arr][options.index];
            map[options.arr][options.index] = "-";
            for (let i = options.arr + 1; i < options.arrNothing + 1; i++) {
                temp2 = map[i][options.indexNothing];
                map[i][options.indexNothing] = temp1;
                move.push(temp1);
                temp1 = temp2;
            }
            break;
        case "left":
            temp1 = map[options.arr][options.index];
            map[options.arr][options.index] = "-";
            for (let i = options.index - 1; i > options.indexNothing - 1; i--) {
                temp2 = map[options.arr][i];
                map[options.arr][i] = temp1;
                move.push(temp1);
                temp1 = temp2;
            }
            break;
        case "right":
            temp1 = map[options.arr][options.index];
            map[options.arr][options.index] = "-";
            for (let i = options.index + 1; i < options.indexNothing + 1; i++) {
                temp2 = map[options.arr][i];
                map[options.arr][i] = temp1;
                move.push(temp1);
                temp1 = temp2;
            }
            break;
    }

    for (let i of move) {
        moveDOM.push(document.querySelector(`[data-number="${i}"]`));
    }
    moveDOM.forEach(elem => {
        const styles = window.getComputedStyle(elem, null);
        const pos = {
            top: +styles.top.slice(0, -2),
            left: +styles.left.slice(0, -2)
        };
        switch(options.direction) {
            case "up" :
                elem.style.top = `${pos.top - sizeSq}px`;
                break;
            case "down":
                elem.style.top = `${pos.top + sizeSq}px`;
                break;
            case "left":
                elem.style.left = `${pos.left - sizeSq}px`;
                break;
            case "right":
                elem.style.left = `${pos.left + sizeSq}px`;
                break;
        }
    });
    const isFinish = (() => {
        let next = 0;
        for (let arr of map) {
            for (let elem of arr) {
                if (next + 1 === +elem) {
                    next = +elem;
                } else if (elem !== '-') return false;
            }
        }
        return true;
    })();

    return isFinish;
}
export { moveSquare };