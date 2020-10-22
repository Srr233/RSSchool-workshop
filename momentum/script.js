"Use strict";

const focus = document.querySelector('.todo__todo');
const closeTodo = document.querySelector('.todo__close');
const inputFocus = document.querySelector('.todo__done');
const name = document.querySelector('.greetings__name');

let myLocalStorage = JSON.parse(localStorage.getItem('momentum'));
if (myLocalStorage) {
    if (myLocalStorage.name) {
        name.textContent = myLocalStorage.name.length ? myLocalStorage.name : '(Enter your name.)';
    }
    if (myLocalStorage.focus) {
        if (myLocalStorage.focus.today === new Date().getDate()) {
            if (myLocalStorage.focus.text) {
                focus.textContent = myLocalStorage.focus.text;
                inputFocus.style.display = 'none';
                focus.style.display = 'block';
                closeTodo.style.display = 'block';
            }
        }
    }
} else myLocalStorage = {};

//---------------------------------------------------------------------------------------------------------------------------

function showTime (start) {
    const TIME = [document.querySelector('#hour'), document.querySelector('#minutes')];
    const DATA = new Date();
    const HOURS = DATA.getHours().toString().length === 1 ? '0' + DATA.getHours().toString() : DATA.getHours().toString() ;
    const MINUTES = DATA.getMinutes().toString().length === 1 ? '0' + DATA.getMinutes().toString() : DATA.getMinutes().toString();

    if (start) {
        TIME[0].textContent = HOURS.length === 1 ? '0' + HOURS : HOURS; 
        TIME[1].textContent = MINUTES.length === 1 ? '0' + MINUTES : MINUTES;
    }
    if (TIME[0].textContent !== HOURS) {
        TIME[0].classList.add('change');
        setTimeout(() => {
            TIME[0].textContent = HOURS;
            TIME[0].classList.remove('change');
        }, 500);
    } else if (TIME[1].textContent !==  MINUTES) {
        TIME[1].classList.add('change');
        setTimeout(() => {
            TIME[1].textContent = MINUTES;
            TIME[1].classList.remove('change');
        }, 500);        
    }
    setTimeout(showTime, 1000);
}

function showWeek() {
    const WEEK = document.querySelector('.week__today');
    const DATA = new Date();
    const YEAR = `${DATA.getFullYear().toString()[2]}${DATA.getFullYear().toString()[3]}`;
    const MONTH = `${DATA.getMonth() + 1}`;
    const DATE = `${DATA.getDate()}`;
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const RESTART = ((24 - DATA.getHours()) * (60 * 1000 * 60)) - (DATA.getMinutes() * (60 * 1000));

    WEEK.textContent = `${DATE}.${MONTH}.${YEAR}, ${DAYS[DATA.getDay()]}`;

    setTimeout(showWeek, RESTART);
}

//--------------------------------------------------CHANGE-BUTTON-------------------------------------------------------------------------

const changeImgButtons = document.querySelector('.img-change__buttons').children;
for (let i = 0; i < changeImgButtons.length; i++) {
    changeImgButtons[i].addEventListener('click', () => document.querySelector('.img-change__img').classList.add('animated'));
}

//-----------------------------------------------------NAME----------------------------------------------------------------------

name.addEventListener('keypress', setName);
name.addEventListener('click', setName);
function setName(e) {
    if (e.keyCode === 13) {
        if (!myLocalStorage) {
            myLocalStorage = {
                name: name.textContent
            }
        } else myLocalStorage.name = name.textContent;
        localStorage.setItem('momentum', JSON.stringify(myLocalStorage));
        name.blur();
    } else if (e.keyCode === undefined) {
        //!!!!!
    }
}

//-----------------------------------------------------FOCUS----------------------------------------------------------------------

focus.addEventListener('keypress', setFocus);
inputFocus.addEventListener('keypress', setFocus);

function setFocus(e) {
    if (e.keyCode === 13) {
        if (!myLocalStorage.focus) {
            myLocalStorage.focus = {
                    text: focus.textContent !== '(Enter your focus)' || inputFocus.value,
                    today: new Date().getDate()
                }
                focus.textContent = myLocalStorage.focus.text;
            } else {
                myLocalStorage.focus.text = e.target === focus ? focus.textContent : inputFocus.value;
                focus.textContent = myLocalStorage.focus.text;
            }
        focus.blur();
        localStorage.setItem('momentum', JSON.stringify(myLocalStorage));

        if (e.target === inputFocus) {
            inputFocus.style.display = 'none';
            focus.style.display = 'block';
            closeTodo.style.display = 'block';
        }
    }
}

//----------------------------------------------------CLOSE-TODO-----------------------------------------------------------------------

closeTodo.addEventListener('click', (e) => {
    closeTodo.style.display = 'none';
    focus.style.display = 'none';
    inputFocus.style.display = 'block';
    inputFocus.value = '';
});

//----------------------------------------------------DOTS-----------------------------------------------------------------------

const dots = document.querySelector('.dot-stretching');

dots.addEventListener('click', showMoreColor);

function showMoreColor(e) {
    let delWindow = document.querySelector('.windowColor');
    if (!delWindow) {
        const where = dots.getBoundingClientRect();
        const windowColor = document.createElement('div');
        windowColor.classList.add('windowColor');
        windowColor.style.left = where.width / 2 + where.left + 'px';
        windowColor.style.top = where.height + where.top + 5 + 'px';
        windowColor.append(color('blue'));
        windowColor.append(color('yellow'));
        windowColor.append(color('red'));
        windowColor.append(color('gray'));
        document.body.insertAdjacentElement('afterend', windowColor);
    }
    e.stopPropagation();

}

function color(color) {
    const colorBlock = document.createElement('div');
    colorBlock.classList.add(`windowColor__${color}`);
    return colorBlock;
}
document.body.addEventListener('click', () => {
    let delWindow = document.querySelector('.windowColor');
    if (delWindow) delWindow.remove();
})



showTime(true);
showWeek(true);