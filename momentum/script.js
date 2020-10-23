"Use strict";

const focus = document.querySelector('.todo__todo');
const name = document.querySelector('.greetings__name');
const inputFocus = document.querySelector('.todo__done');
const inputGreetings = document.querySelector('.greetings__enter-name');


let myLocalStorage = JSON.parse(localStorage.getItem('momentum'));
if (myLocalStorage) {
    if (myLocalStorage.name) {
        name.textContent = myLocalStorage.name;
        name.style.display = 'block';
        inputGreetings.style.display = 'none';
    }
    if (myLocalStorage.focus) {
        if (myLocalStorage.focus.today === new Date().getDate()) {
            if (myLocalStorage.focus.text) {
                focus.textContent = myLocalStorage.focus.text;
                inputFocus.style.display = 'none';
                focus.style.display = 'block';
            } else {
                myLocalStorage.focus.today = new Date().getDate();
            }
        }
    }
    if (myLocalStorage.name) {
        
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
name.addEventListener('click', clickName);
inputGreetings.addEventListener('keypress', setName);
function setName(e) {
    if (e.keyCode === 13) {
        myLocalStorage.name = inputGreetings.value;
        name.textContent = inputGreetings.value;

        name.style.display = 'block';
        inputGreetings.style.display = 'none';

        localStorage.setItem('momentum', JSON.stringify(myLocalStorage));
    } else {

    }
}

function clickName(e) {
    name.style.display = 'none';
    inputGreetings.style.display = 'block';
    inputGreetings.value = '';
    inputGreetings.setAttribute('autofocus', '');

    e.stopPropagation();
}

//-----------------------------------------------------FOCUS----------------------------------------------------------------------

focus.addEventListener('keypress', setFocus);
focus.addEventListener('click', clickFocus);
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
            if (myLocalStorage.focus.today !== new Date().getDate()) myLocalStorage.focus.today = new Date().getDate();
                focus.textContent = myLocalStorage.focus.text;
            }
        focus.blur();
        localStorage.setItem('momentum', JSON.stringify(myLocalStorage));
        if (e.target === inputFocus) {
            inputFocus.style.display = 'none';
            focus.style.display = 'block';
        }
    }
}

function clickFocus(e) {
    focus.style.display = 'none';
    inputFocus.style.display = 'block';
    inputFocus.setAttribute('autofocus', '');
    inputFocus.value = '';

    e.stopPropagation();
}

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
document.body.addEventListener('click', e => {
    let delWindow = document.querySelector('.windowColor');
    if (delWindow) delWindow.remove();
    if (inputFocus.style.display === 'block' && inputGreetings.style.display === 'block') {
        inputFocus.style.display = 'none';
        focus.style.display = 'block';
        inputGreetings.style.display = 'none';
        name.style.display = 'block';
    }
    if (focus.style.display === 'none' && e.target !== inputFocus) {
        inputFocus.style.display = 'none';
        focus.style.display = 'block';
    } else if (e.target !== inputGreetings) {
        inputGreetings.style.display = 'none';
        name.style.display = 'block';
    }
})



showTime(true);
showWeek(true);
getWeather();

//------------------------------------------------------------------GET-WEATHER---------------------------------------------------------

const opencage = {
    key: '4e08c7c60406449f9d030060501dc4d9',
    url: 'https://api.opencagedata.com',

    getRequestUrl(query, lang) {
        return `${this.url}/geocode/v1/json?q=${query}&key=${this.key}&language=${lang}&pretty=1&no_annotations=1`;
    },
};

async function getWeather() {
    let coords = await new Promise ((resolve, reject) => {
                                navigator.geolocation.getCurrentPosition(e => {
                                    resolve(e);
                                });
                            });
    const lat = coords.coords.latitude;
    const long = coords.coords.longitude;

    let city = await getCity(`${lat},${long}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&lang=ru&appid=3272373a93d358d7bfb7d5c4eb52994b&units=metric`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

async function getCity(coords) {
    const url = opencage.getRequestUrl(coords, 'ru');
    const response = await fetch(url)
    const data = await response.json();
    return data.results[0].components.city;
}

function getWeatherCurrent (idIcon, description, temperature) {
    
}
