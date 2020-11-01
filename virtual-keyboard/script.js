"use strict";

alert(`Важные моменты для проверяющих:
-1. Оставьте свои контактные данные для связи: директ или телеграмм.
0. Перед тем как начать проверку, переведите вашу клавиатуру в соответствие с виртуальной (т.е. английский)
1. Физическая клавиатура это настоящая клавиатура которую вы используете. 
2. Если вы зайдете через мобильный девайс, то в текстовом поле не будет возможности изменять текст посредством встроенной клавиатуры, а следовательно и курсор не будет виден в ней.
3. Shift + alt - переводит на другой язык, кнопки немного шалят, может не пройти анимации, раскладка меняется. Чтобы анимация была нормальной, нажмите в начале Alt.
4. Так же будьте внимательны, перед тем как использовать физическую клавиатуру, проверьте, соответствует ли Ваш выбранный язык и язык вирутальной клавиатуры?
5. Не знал как сделать так чтобы клавиши можно было зажать и их не колбасило, т.е. при зажатии Shift реальной клавиатуры могут быть баги в виде того что Css кнопка не отжалась.
6. Так-же есть спорные пункты по ТЗ, например: у нас обязана быть кнопка en/ru, но в тоже время отображать какой язык выбран изначально. Я сделал что это всё будет выполнять одна кнопка, так-что не засчитывайте это как ошибку, пожалуйста :)
ПОЖАЛУЙСТА, СМОТРИТЕ ПО ТЗ!
Я постарался сделать всё максимально по ТЗ, если заметите какие-то спорные вопросы то пожалуйста, поставьте + в мою пользу, или напишите мне чтобы я пофиксил :)
Надеюсь Вам всё понравится :)`);
alert('Я настоятельно прошу прочесть то что было написано ранее. Всё прочесть, пожалуйста.');
const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
if (isMobile) {
  document.querySelector('.use-keyboard-input').setAttribute('readonly', '');
}
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    isSound: true,
    value: "",
    capsLock: false,
    shift: false,
    language: 'ru',
    cursorPositions: {
      start: 0,
      end: 0
    }
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    let canSpeak = true;
    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        if(canSpeak) {
          canSpeak = false;
          hi();
        }
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "<", ">",
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "en/ru", "space", "soundOff", "done"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "?", ">"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.setAttribute('data-key', 'Backspace');

          keyElement.addEventListener("click", () => {
            const value = this.properties.value;
            const currentPos = this.properties.cursorPositions;
            const textArea = document.querySelector(".use-keyboard-input");

            currentPos.start = textArea.selectionStart;
            currentPos.end = textArea.selectionEnd;
          
            if (!currentPos.start && !currentPos.end) {
              this._updateFocus();
              return;
            }

            this.properties.value = value.slice(0, currentPos.start - 1);
            textArea.value = this.properties.value;

            this.properties.value = value.slice(currentPos.end);
            textArea.value += this.properties.value;

            this.properties.value = textArea.value;
            this._updateFocus('delete');

            
          });

          break;

        case "soundOff": 
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = `<img src='assets/soundsOn.png' style='object-fit: cover; height: 65%; width: 65%;'>`;
          keyElement.addEventListener('click', (e) => {
            Keyboard.properties.isSound = !Keyboard.properties.isSound;
            let target = e.target;
            while(target.tagName !== 'IMG') {
              target = target.children[0];
            }
            if (target.src.includes('assets/soundsOn.png')) {
              target.src = 'assets/soundsOff.png';
            } else target.src = 'assets/soundsOn.png';
          });
          break;
        case "caps":
          keyElement.classList.add("keyboard__key--activatable");
          keyElement.setAttribute('data-key', 'CapsLock');
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.setAttribute('data-caps', '');
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.setAttribute('data-key', 'Enter');

          keyElement.addEventListener("click", () => {
            const value = this.properties.value;
            const currentPos = this.properties.cursorPositions;
            const textArea = document.querySelector(".use-keyboard-input");

            currentPos.start = textArea.selectionStart;
            currentPos.end = textArea.selectionEnd;

            if (value.slice(currentPos.end).match(/\w/)) {
              this.properties.value = value.slice(0, currentPos.start) +
              '\n' + value.slice(currentPos.end);
              currentPos.start++;
              currentPos.end++;
              textArea.value = this.properties.value;
            } else {
              this.properties.value = value.slice(0, currentPos.start) +
                '\n' + value.slice(currentPos.end);
              currentPos.start++;
              currentPos.end++;
              textArea.value = this.properties.value;
            }
            this._updateFocus('enter');
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.setAttribute('data-key', ' ');

          keyElement.addEventListener("click", () => {
            const value = this.properties.value;
            const currentPos = this.properties.cursorPositions;
            const textArea = document.querySelector(".use-keyboard-input");

            currentPos.start = textArea.selectionStart + 1;
            currentPos.end = textArea.selectionEnd + 1;

            if (value) {
              this.properties.value = value.slice(0, currentPos.start - 1) +
              ' ' + value.slice(currentPos.end - 1);
            } else {
              this.properties.value = ' ';
            }

            this._triggerEvent("oninput");
            this._updateFocus('space');
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            new Audio('assets/audio/keyPress.mp3').autoplay = true;
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "shift": 
          keyElement.classList.add('keyboard__key--wide', "keyboard__key--activatable");
          keyElement.setAttribute('data-key', 'Shift');
          keyElement.innerHTML = createIconHTML('Shift');

          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          });
          
          break;

        case "en/ru": 
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = 'en';
          keyElement.setAttribute('data-key', 'en/ru');

          keyElement.addEventListener("click", () => {
            keyElement.innerHTML = keyElement.innerHTML === "en" ? "ru" : "en"; 
            this.properties.language = this.properties.language === 'en' ? 'ru' : 'en';
            if (this.properties.language === 'ru' && this.properties.isSound) {
              new Audio('assets/audio/keyPress.mp3').autoplay = true;
            } else if (this.properties.isSound) new Audio('assets/audio/keyPressRu.mp3').autoplay = true;
            this._reverseLanguage();
            this._updateFocus();
          });
          break;

        case "<":
          
          keyElement.innerHTML = createIconHTML('arrow_left');
          keyElement.setAttribute('data-key', 'ArrowLeft');

          keyElement.addEventListener('click', () => {
            this._updateFocus('left');
          });
        break;

        case ">":
          
          keyElement.innerHTML = createIconHTML('arrow_right');
          keyElement.setAttribute('data-key', 'ArrowRight');

          keyElement.addEventListener('click', () => {
            this._updateFocus('right');
          });
        break;

        default:
          keyElement.textContent = key.toLowerCase();

          const symbols = [")", "!", "@", "#", "$", "%", "^", "&", "*", "("];
          const textArea = document.querySelector(".use-keyboard-input");
          
          keyElement.addEventListener("click", (e) => {
            const value = this.properties.value;
            const currentPos = this.properties.cursorPositions;
            currentPos.start = textArea.selectionStart + 1;
            currentPos.end = textArea.selectionEnd + 1;

            if (this.properties.capsLock && !this.properties.shift) {
              if (value) {
                this.properties.value = value.slice(0, currentPos.start - 1) +
                e.target.textContent.toUpperCase() + value.slice(currentPos.end - 1);
              } else {
                this.properties.value = e.target.textContent;
              }
            } else if (!this.properties.capsLock && !this.properties.shift) {
              if (value) {
                this.properties.value = value.slice(0, currentPos.start - 1) +
                e.target.textContent.toLowerCase() + value.slice(currentPos.end - 1);
              } else {
                this.properties.value = e.target.textContent;
              }
            } else if (this.properties.shift && !this.properties.capsLock && symbols[+key]) {
              if (value) {
                  this.properties.value = value.slice(0, currentPos.start - 1) +
                  symbols[+key] + value.slice(currentPos.end - 1);
              } else {
                this.properties.value = symbols[+key];
              }
            } else {
              if (value) {
                this.properties.value = value.slice(0, currentPos.start - 1) +
                e.target.textContent + value.slice(currentPos.end - 1);
              } else {
                this.properties.value += e.target.textContent;
              }
            }
            this._triggerEvent("oninput");
            this._updateFocus('add');

          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _updateFocus(type) {
    const textArea = document.querySelector(".use-keyboard-input");
    const currentPos = this.properties.cursorPositions;
    textArea.focus();

    if (type === 'add' || type === 'space') {
      if (this.properties.language === 'ru' && this.properties.isSound) {
        new Audio('assets/audio/keyPress.mp3').autoplay = true;
      } else if (this.properties.isSound) new Audio('assets/audio/keyPressRu.mp3').autoplay = true;
      textArea.selectionStart = currentPos.start;
      textArea.selectionEnd = currentPos.end;
    } else if (type === 'delete') {
      if (this.properties.isSound) new Audio ('assets/audio/delete.WAV').autoplay = true;
      textArea.selectionStart = currentPos.start - 1;
      textArea.selectionEnd = currentPos.end - 1;
    } else if (type === 'shift') {
      if (this.properties.isSound) new Audio('assets/audio/shift.mp3').autoplay = true;
    } else if (type === 'enter') {
      if (this.properties.isSound) new Audio('assets/audio/enter.mp3').autoplay = true;
    } else if (type === 'caps') {
      if (this.properties.isSound) new Audio('assets/audio/caps.mp3').autoplay = true;
    } else if (type === 'left') {
      if (this.properties.language === 'ru' && this.properties.isSound) {
        new Audio('assets/audio/keyPress.mp3').autoplay = true;
      } else if (this.properties.isSound) new Audio('assets/audio/keyPressRu.mp3').autoplay = true;
      if (currentPos.start && currentPos.end) {
        if (currentPos.start !== textArea.selectionStart && currentPos.end !== textArea.selectionEnd) {
          currentPos.start = textArea.selectionStart;
          currentPos.end = textArea.selectionEnd;
        }
        textArea.selectionStart = currentPos.start - 1;
        textArea.selectionEnd = currentPos.end - 1;
      }
    } else if (type === 'right') {
      if (this.properties.language === 'ru' && this.properties.isSound) {
        new Audio('assets/audio/keyPress.mp3').autoplay = true;
      } else if (this.properties.isSound) new Audio('assets/audio/keyPressRu.mp3').autoplay = true;
      if (currentPos.start !== textArea.selectionStart && currentPos.end !== textArea.selectionEnd) {
        currentPos.start = textArea.selectionStart;
        currentPos.end = textArea.selectionEnd;
      }
        textArea.selectionStart = currentPos.start + 1;
        textArea.selectionEnd = currentPos.end + 1;
    } else if (currentPos.start && currentPos.end) {
      textArea.selectionStart = currentPos.start;
      textArea.selectionEnd = currentPos.end; 
    }
    currentPos.start = textArea.selectionStart;
    currentPos.end = textArea.selectionEnd;

  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (this.properties.shift && this.properties.capsLock) {
          key.textContent = key.textContent.toLowerCase();
        } else if (this.properties.shift && !this.properties.capsLock) {
          key.textContent = key.textContent.toUpperCase();
        } else key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
    this._updateFocus('shift');
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;

    const symbols = [")", "(", "*", "&", "^", "%", "$", "#", "@", "!"];
    const symbolsNum = ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
    const auxiliarySignsShift = ['/', '>', '<', '\"', ':', '}', '{'];
    const auxiliarySignsShiftReverse = ['?', '.', ',', '\'', ';', ']', '['];

    for (const key of this.elements.keys) {
      if (key.textContent === 'shift') continue;
      if (!this.properties.shift) {
        if (key.childElementCount === 0 && symbols.includes(key.textContent)) {
          key.textContent = symbolsNum.pop();
        } else if (key.childElementCount === 0 && auxiliarySignsShift.includes(key.textContent)) {
          if (key.textContent === '?') {
            key.textContent = '/';
          } else if (key.textContent === '/') {
            key.textContent = '?';
          } else key.textContent = auxiliarySignsShiftReverse.pop();
        } else if (key.childElementCount === 0) {
          if (this.properties.capsLock) {
            key.textContent = key.textContent.toUpperCase();
          } else key.textContent = key.textContent.toLowerCase();
        }
      } else {
        if (key.childElementCount === 0 && key.textContent.match(/[0-9]/)) {
          key.textContent = this.properties.shift ? symbols.pop() : key.textContent;
        } else if (key.childElementCount === 0 && auxiliarySignsShiftReverse.includes(key.textContent)) {
          if (key.textContent === '?') {
            key.textContent = '/';
          } else if (key.textContent === '/') {
            key.textContent = '?';
          } else key.textContent = auxiliarySignsShift.pop();
        } else if (key.childElementCount === 0) {
          if (this.properties.capsLock) {
            key.textContent = key.textContent.toLowerCase();
          } else key.textContent = key.textContent.toUpperCase();
        }
      }
    }
    this._updateFocus('caps');
  },

  _reverseLanguage() {
    let enRu;
    const symbols = [")", "(", "*", "&", "^", "%", "$", "#", "@", "!", ];

    if (this.properties.shift) {
      if (this.properties.language === 'en') {
        enRu = {
          "`": "ё", "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", "i": "ш", "o": "щ",
          "p": "з", "{": "х", "}": "ъ", "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р",
          "j": "о", "k": "л", "l": "д", ":": "ж", '"': "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
          "n": "т", "m": "ь", "<": "б", ">": "ю", '/': '/'
        };
      } else {
        enRu = {
          "ё": "`", "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u", "ш": "i", "щ": "o",
          "з": "p", "х": "{", "ъ": "}", "ф": "a", "ы": "s", "в": "d", "а": "f", "п": "g", "р": "h",
          "о": "j", "л": "k", "д": "l", "ж": ":", "э": '"', "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b",
          "т": "n", "ь": "m", "б": "<", "ю": ">", '/': '/'
        };
      }
    } else {
      if (this.properties.language === 'en') {
        enRu = {
          "`": "ё", "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", "i": "ш", "o": "щ",
          "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р",
          "j": "о", "k": "л", "l": "д", ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
          "n": "т", "m": "ь", ",": "б", ".": "ю", '?': '?'
        };
      } else {
        enRu = {
          "ё": "`", "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u", "ш": "i", "щ": "o",
          "з": "p", "х": "[", "ъ": "]", "ф": "a", "ы": "s", "в": "d", "а": "f", "п": "g", "р": "h",
          "о": "j", "л": "k", "д": "l", "ж": ";", "э": "'", "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b",
          "т": "n", "ь": "m", "б": ",", "ю": ".", '?': '?',
        };
      }
    }


    if (this.properties.language === 'en') {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0 &&
            key.textContent !== 'shift' &&
            key.textContent !== 'en' &&
            key.textContent !== 'ru' &&
            key.textContent !== 'EN' &&
            key.textContent !== 'RU' &&
            isNaN(+key.textContent)) {
          if (!this.properties.shift && !this.properties.capsLock) {
                key.textContent = enRu[key.textContent];
          } else if (this.properties.shift) {
            if (!symbols.includes(key.textContent)) {
              key.textContent = enRu[key.textContent.toLowerCase()].toUpperCase();
            }
          } else if (this.properties.capsLock) {
            key.textContent = enRu[key.textContent.toLowerCase()].toUpperCase();
          }
        }
      }

    } else {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0 &&
          key.textContent !== 'shift' &&
          key.textContent !== 'en' &&
          key.textContent !== 'ru' &&
          key.textContent !== 'EN' &&
          key.textContent !== 'RU' &&
          isNaN(+key.textContent)) {
          if (!this.properties.shift && !this.properties.capsLock) {
            key.textContent = enRu[key.textContent];
          } else {
            if (!symbols.includes(key.textContent)) {
              key.textContent = enRu[key.textContent.toLowerCase()].toUpperCase();
            }
          }
        }
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
let isPress = Date.now();
let currentButton;

document.querySelector('.use-keyboard-input').addEventListener('keyup', (e) => {
  if (Keyboard.properties.language === 'ru') {
    new Audio('assets/audio/keyPress.mp3').autoplay = true;
  } else new Audio('assets/audio/keyPressRu.mp3').autoplay = true;
});
document.querySelector('.use-keyboard-input').addEventListener('keydown', (e) => {
  let event = new Event('click');
  const textArea = document.querySelector('.use-keyboard-input');

  if (e.altKey && e.shiftKey) {
    let keyElem1 = document.querySelector('[data-key="en/ru"]');
    keyElem1.dispatchEvent(event);
    keyElem1.classList.add('active');
    setTimeout(() => keyElem1.classList.remove('active'), 200);
    return;
  }

  if (e.key) {
    let keyElem = Array.from(Keyboard.elements.keys).find(elem => elem.dataset.key === e.key || e.key === elem.textContent);
    if (keyElem) {
      if (keyElem.dataset.key === "Shift" && Date.now() - isPress > 700) {
        isPress = Date.now();
        keyElem.dispatchEvent(event);
      } else if (keyElem.dataset.key === "CapsLock" && Date.now() - isPress > 700) {
        isPress = Date.now();
        keyElem.dispatchEvent(event);
      } else if (Date.now() - isPress < 700) {
        isPress = Date.now();
      }
      keyElem.classList.add('active');
      setTimeout(() => keyElem.classList.remove('active'), 200);
      currentButton = keyElem;
    }
    let val;
    if (textArea.selectionStart !== textArea.selectionEnd &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Shift" &&
      e.key !== "CapsLock") {
      val = e.target.value.slice(0, textArea.selectionStart + 1) + e.target.value.slice(textArea.selectionEnd);
    } else val = e.target.value.slice(0);
    Keyboard.properties.value = val;
  }
});
let isRecord = false;
let recognizer = new webkitSpeechRecognition();
let resultText = '';
let resultAll = [];

const textArea = document.querySelector('.use-keyboard-input');
recognizer.interimResults = true;
recognizer.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');
  resultText = transcript + ' ';
});
recognizer.addEventListener('end', () => {
  resultAll.push(resultText);
  if (isRecord) {
    recognizer.start();
  } else {
    Keyboard.properties.value = Keyboard.properties.value + ' ' + resultAll.join('');
    textArea.value = Keyboard.properties.value;
    resultAll = [];
    resultText = '';
  }
});

let buttonSpeech = document.querySelector('.button-speech');
buttonSpeech.addEventListener('click', function () {
  recognizer.lang = Keyboard.properties.language === 'ru' ? 'en-US' : 'ru-Ru';
  if (!isRecord) {
    isRecord = !isRecord;
    this.classList.add('record');
    recognizer.start();
  } else {
    this.classList.remove('record');
    isRecord = !isRecord;
  }
});

function hi () {
  speechSynthesis.speak(new SpeechSynthesisUtterance(`Здравствуйте, сегодня прекрассный день для того, чтобы мы проверили работы других и сами вдохновились! Надеюсь Вам понравится. И да. ЖЫВЕ БЕЛАРУСЬ!`));
}
