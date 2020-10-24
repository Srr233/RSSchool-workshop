"Use strict";
const focus = document.querySelector('.todo__todo');
const name = document.querySelector('.greetings__name');
const inputFocus = document.querySelector('.todo__done');
const inputGreetings = document.querySelector('.greetings__enter-name');

const opencage = {
    key: '4e08c7c60406449f9d030060501dc4d9',
    url: 'https://api.opencagedata.com',

    getRequestUrl(query, lang) {
        return `${this.url}/geocode/v1/json?q=${query}&key=${this.key}&language=${lang}&pretty=1&no_annotations=1`;
    },
};


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
    if (myLocalStorage.geolocation) {
        showWeather();
    }
} else myLocalStorage = {};

//-------------------------------------------------------------SHOW-TIME--------------------------------------------------------------

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
    inputFocus.value = '';

    e.stopPropagation();
}

//----------------------------------------------------DOTS-----------------------------------------------------------------------

const dots = document.querySelector('.dot');
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
    colorBlock.addEventListener('click', () => {changeColor(color)});
    return colorBlock;
}
function changeColor(color) {
    name.classList.toggle(`${color}`);
    setTimeout(() => changeColor(color), 1000);
}

//------------------------------------------------------------------GET-WEATHER---------------------------------------------------------

async function showWeather(userCity) {
    document.querySelector('.weather__load').style.display = 'block';
    document.querySelector('.metric').style.display = 'none';

    let coords;
    let city;
    let currentCords = '';
    if (!userCity) {
        if (!myLocalStorage.geolocation) {
            coords = await new Promise ((resolve, reject) => {
                                    navigator.geolocation.getCurrentPosition(e => {
                                        if(e) {
                                            resolve(e);
                                        } else alert('Разрешите узнать вашу геолокацию, ну пожалуйста :3');
                                        console.log(e);
                                    });
                                });
            currentCords = `${coords.coords.latitude},${coords.coords.longitude}`;
            myLocalStorage.geolocation = currentCords;
        } else currentCords = myLocalStorage.geolocation;
        city = userCity || await getCity(currentCords);
    } else city = userCity;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&lang=ru&appid=3272373a93d358d7bfb7d5c4eb52994b&units=metric`
    const res = await fetch(url);
    const data = await res.json();
    await showWeatherCurrent(data.weather[0].id, data.weather[0].description, data.main.temp, city);
    localStorage.setItem('momentum', JSON.stringify(myLocalStorage));
}

async function getCity(coords) {
    const url = opencage.getRequestUrl(coords, 'ru');
    const response = await fetch(url)
    const data = await response.json();
    return data.results[0].components.city;
}

async function showWeatherCurrent (idIcon, description, temp, city) {
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const cityUser = document.querySelector('.metric__city');
    document.querySelector('.weather__load').style.display = 'none';
    document.querySelector('.metric').style.display = 'flex';
    cityUser.textContent = city;
    weatherIcon.classList.add(`owf-${idIcon}`);
    temperature.textContent = temp + "°";
    weatherDescription.textContent = description;   
}
//------------------------------------------------------------------METRIC---------------------------------------------------------
const metric = document.querySelector('.metric');
const metricCity = document.querySelector('.metric__city');
const inputCity = document.querySelector('.weather__newCity');

inputCity.addEventListener('keypress', setCity);
metric.addEventListener('click', searchWeather);

function searchWeather(e) {
    const boundRect = metric.getBoundingClientRect();
    inputCity.style.top = `${boundRect.height + 5}px`;
    inputCity.style.left = '0';
    inputCity.style.display = 'block';

    e.stopPropagation();
}

function setCity(e) {
    if (e.keyCode === 13) {
        if (!myLocalStorage.city) {
            myLocalStorage.city = inputCity.value;
            metricCity.textContent = inputCity.value;
        } else {
            myLocalStorage.city = inputCity.value ? inputCity.value : myLocalStorage.city;
        }
        if (inputCity.value) {
            inputCity.style.display = 'none';
            showWeather(inputCity.value);
            metricCity.textContent = inputCity.value;
            inputCity.value = '';
            
        }
        localStorage.setItem('momentum', JSON.stringify(myLocalStorage));
    }
}

//-----------------------------------------------------------------BODY-EVENT--------------------------------------------------------------

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
    if (inputCity.style.display !== 'none' && e.target !== inputCity) inputCity.style.display = 'none';
});

//---------------------------------------------------------------SET-BACKGROUND-IMAGE-----------------------------------------------------
let currentImg = '';

const rightClick = document.querySelector('.img-change__right');
const leftClick = document.querySelector('.img-change__left');
rightClick.addEventListener('click', () => { setBackgroundImage(currentImg, 'right') });
leftClick.addEventListener('click', () => { setBackgroundImage(currentImg, 'left') });

function setBackgroundImage (current, direction) {
    document.querySelector('.img-change__img').classList.add('animated');

    const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', 
    '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    
    const img = document.querySelector('.background-image__img');
    const greeting = document.querySelector('.greetings__welcome');
    const today = new Date();
    const hour = today.getHours();

    const newImg = document.createElement('img');
    newImg.classList.add('background-image__img');
    newImg.setAttribute('alt', 'background img');
    newImg.onload = load;

    rightClick.setAttribute('disabled', '');
    leftClick.setAttribute('disabled', '');

    function load () {
        img.classList.add('delete');
        newImg.classList.add('delete');
        setTimeout(() => {
            img.remove();
            document.querySelector('.background-image').append(newImg);
            setTimeout(() => {
                newImg.classList.remove('delete');
                rightClick.removeAttribute('disabled', '');
                leftClick.removeAttribute('disabled', '');
                document.querySelector('.img-change__img').classList.remove('animated');
            }, 500);
        }, 500);
    }

    let imgCurrent = images[current];
    if (!direction) imgCurrent = current === 18 ? '01.jpg' : images[current + 1]; 
    switch (direction) {
        case 'right':
            if (current < 18) {
                imgCurrent = images[current + 1];
            } else imgCurrent = '01.jpg';
        break;
        case 'left':
            if (current > 0) {
                imgCurrent = images[current - 1];
            } else imgCurrent = '20.jpg';
        break;
    }
    if (hour < 6 ) {
        newImg.src = `assets/images/night/${imgCurrent}`;
        greeting.textContent = 'Доброй ночи, ';
    } else if (hour < 12) {
        newImg.src = `assets/images/morning/${imgCurrent}`;
        greeting.textContent = 'Добрый утро, ';
        
    } else if (hour < 18) {
        newImg.src = `assets/images/day/${imgCurrent}`;
        greeting.textContent = 'Добрый день, ';
    } else {
        newImg.src = `assets/images/evening/${imgCurrent}`;
        greeting.textContent = 'Доброй вечер, ';
    }

    currentImg = images.indexOf(imgCurrent);
    setTimeout(() => setBackgroundImage(images.indexOf(imgCurrent)), 3600000);
}

showWeather();
setBackgroundImage(-1);
showTime(true);
showWeek(true);

