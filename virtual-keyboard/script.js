"use strict";

//alert() + мерцающая палочка
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
    value: "",
    capsLock: false,
    shift: false,
    language: null,
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

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
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
      "en/ru", "space", "done"
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

        case "caps":
          keyElement.classList.add("keyboard__key--activatable");
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
            this._updateFocus();
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

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
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "shift": 
          keyElement.classList.add('keyboard__key--wide', "keyboard__key--activatable");
          keyElement.setAttribute('data-shift', '');
          keyElement.innerHTML = "shift";

          keyElement.addEventListener("click", () => {
            if (this.properties.capsLock) {
              document.querySelector('[data-caps]').classList.remove('keyboard__key--active');
              this.properties.shift = true;
              this._toggleCapsLock();
            }
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          });
          
          break;

        case "en/ru": 
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = 'en/ru';

          keyElement.addEventListener("click", () => {
            this.properties.language = this.properties.language === 'en' ? 'ru' : 'en';
            this._reverseLanguage();
            this._updateFocus();
          });
          break;

        case "<":
          
          keyElement.innerHTML = createIconHTML('arrow_left');
          
          keyElement.addEventListener('click', () => {
            this._updateFocus('left');
          });
        break;

        case ">":
          
          keyElement.innerHTML = createIconHTML('arrow_right');
          
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

    if (type === 'add') {
      textArea.selectionStart = currentPos.start;
      textArea.selectionEnd = currentPos.end;
    } else if (type === 'delete') {
      textArea.selectionStart = currentPos.start - 1;
      textArea.selectionEnd = currentPos.end - 1;
    } else if (type === 'left') {
      if (currentPos.start && currentPos.end) {
        if (currentPos.start !== textArea.selectionStart && currentPos.end !== textArea.selectionEnd) {
          currentPos.start = textArea.selectionStart;
          currentPos.end = textArea.selectionEnd;
        }
        textArea.selectionStart = currentPos.start - 1;
        textArea.selectionEnd = currentPos.end - 1;
      }
    } else if (type === 'right') {
      if (currentPos.start !== textArea.selectionStart && currentPos.end !== textArea.selectionEnd) {
        currentPos.start = textArea.selectionStart;
        currentPos.end = textArea.selectionEnd;
      }
        textArea.selectionStart = currentPos.start + 1;
        textArea.selectionEnd = currentPos.end + 1;
    } else if (type === 'space') {
      textArea.selectionStart = currentPos.start;
      textArea.selectionEnd = currentPos.end;
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

    if (this.properties.shift) {
      document.querySelector('[data-shift]').classList.remove('keyboard__key--active');
      this._toggleShift();
    }

    for (const key of this.elements.keys) {
      if (key.textContent === 'shift') continue;
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
    this._updateFocus();
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
          key.textContent = key.textContent.toLowerCase();
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
          key.textContent = key.textContent.toUpperCase();
        }
      }
    }
    this._updateFocus();
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
            key.textContent !== 'en/ru' &&
            key.textContent !== 'EN/RU' &&
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
          key.textContent !== 'en/ru' &&
          key.textContent !== 'EN/RU' &&
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

document.querySelector('.use-keyboard-input').addEventListener('keypress', (e) => {
  if (e.key) {
    const val = e.target.value.split(0);
    Keyboard.properties.value = val;
  }
})
