import '../../assets/close.svg';
import '../../assets/tink.wav';
import '../../assets/kick.wav';
import '../../assets/boom.wav';
import '../../assets/clap.wav';
import '../../assets/hihat.wav';
import '../../assets/openhat.wav';
import '../../assets/backspace.svg';
import '../../assets/caps-lock.svg';
import '../../assets/english.svg';
import '../../assets/enter.svg';
import '../../assets/shift.svg';
import '../../assets/close.svg';
import '../../assets/microphone.svg';
import '../../assets/space.svg';
import '../../assets/left.svg';
import '../../assets/right.svg';
import '../../assets/voice.svg';
import '../../assets/russian.svg';

function KeysValuesMap(enDefault, enShift, ruDefault, ruShift) {
  this.english = {
    default: enDefault,
    shift: enShift
  };
  this.russian = {
    default: ruDefault,
    shift: ruShift
  };
}

function Key(name, valuesMap, element, language) {
  this.name = name;
  this.values = valuesMap;
  this.element = element;
  this.value = valuesMap[language].default;

  this.setValue = (languageCurrent, shift, capsLock) => {
    let value = this.values[languageCurrent][shift ? 'shift' : 'default'];
    this.value = shift !== capsLock ? value.toUpperCase() : value.toLowerCase();
    this.element.innerText = this.value;
  };
}

function Keyboard(keysInfoMaps, keysElements, inputElement, audioElements) {
  this.keysInfoMaps = keysInfoMaps;
  this.keysElements = Array.from(keysElements);
  this.inputElement = inputElement;
  this.audioElements = Array.from(audioElements);
  this.keys = new Map();
  this.capsLock = false;
  this.shift = false;
  this.microphone = false;
  this.close = false;
  this.voice = false;
  this.language = 'english';
  this.recognition = new window.SpeechRecognition();

  this.initial = () => {
    this.recognition.onresult = event => {
      let text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      this.insertText(text);
    };

    this.keysInfoMaps.forEach(item => {
      if (Array.isArray(item[1])) {
        this.keys.set(
          item[0],
          new Key(
            'key',
            new KeysValuesMap(...item[1]),
            this.keysElements.find(element => +element.id === item[0]),
            'english'
          )
        );
      } else {
        this.keys.set(
          item[0],
          {
            name: item[1].name,
            element: this.keysElements.find(element => +element.id === item[0])
          }
        );
      }
    });
  };
  this.clickKey = event => {
    let key = this.keys.get(+event.currentTarget.id);

    if (key.name === 'key') {
      this.insertText(key.value);
    } else {
      switch (key.name) {
        case 'backspace': this.clickBackspace();
          break;
        case 'capslock': this.clickCapsLock(key.element);
          break;
        case 'enter': this.insertText('\n');
          break;
        case 'microphone': this.clickMicrophone(key.element);
          break;
        case 'close': this.closeKeyboard();
          break;
        case 'shift': this.clickShift(key.element);
          break;
        case 'lang': this.clickLang(key.element);
          break;
        case 'space': this.insertText(' ');
          break;
        case 'left': this.clickLeft();
          break;
        case 'right': this.clickRight();
          break;
        case 'voice': this.clickVoice(key.element);
          break;
        default: throw new Error('not found');
      }
    }
    const input = document.querySelector('.input-field').querySelector('input');
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    if (this.voice) this.playAudio(key.name);
  };
  this.getCursorPosition = () => this.inputElement.selectionStart;
  this.setCursorPosition = position => {
    this.inputElement.selectionStart = position;
    this.inputElement.selectionEnd = position;
  };
  this.insertText = text => {
    let cursor = this.getCursorPosition();
    let value = this.inputElement.value;
    this.inputElement.value = `${value.substring(0, cursor)}${text}${value.substring(cursor, value.length)}`;
    this.setCursorPosition(cursor + text.length);
    this.inputElement.focus();
  };
  this.clickBackspace = () => {
    let cursor = this.getCursorPosition();
    let text = this.inputElement.value;

    if (cursor > 0) {
      this.inputElement.value = `${text.substring(0, cursor - 1)}${text.substring(cursor, text.length)}`;
      this.setCursorPosition(cursor - 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickMicrophone = (element) => {
    this.microphone = !this.microphone;
    this.recognition.lang = this.language === 'english' ? 'en-US' : 'ru-RU';

    if (this.microphone) {
      this.recognition.onend = () => this.recognition.start();
      this.recognition.start();
    } else {
      this.recognition.onend = null;
      this.recognition.abort();
    }

    element.setAttribute('aria-checked', `${this.microphone}`);
  };
  this.closeKeyboard = () => {
    document.querySelector('.keyboard').style.display = 'none';
  };
  this.clickLeft = () => {
    let cursor = this.getCursorPosition();

    if (cursor > 0) {
      this.setCursorPosition(cursor - 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickRight = () => {
    let cursor = this.getCursorPosition();
    let length = this.inputElement.value.length;

    if (cursor < length) {
      this.setCursorPosition(cursor + 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickCapsLock = (element) => {
    this.capsLock = !this.capsLock;
    this.changeKeys();
    element.setAttribute('aria-checked', `${this.capsLock}`);
  };
  this.clickShift = (element) => {
    this.shift = !this.shift;
    this.changeKeys();
    element.setAttribute('aria-checked', `${this.shift}`);
  };
  this.clickLang = (element) => {
    this.language = this.language === 'english' ? 'russian' : 'english';
    this.changeKeys();
    element.childNodes[0].setAttribute('alt', `${this.language.substring(0, 2)}`);
    element.childNodes[0].setAttribute('src', `assets/${this.language}.svg`);
  };
  this.clickVoice = (element) => {
    this.voice = !this.voice;
    element.setAttribute('aria-checked', `${this.voice}`);
  };
  this.changeKeys = () => {
    this.keys.forEach(key => {
      if (key.name === 'key') {
        key.setValue(this.language, this.shift, this.capsLock);
      }
    });
  };
  this.playAudio = (name) => {
    let audio;

    switch (name) {
      case 'backspace': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'capslock': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'enter': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'shift': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      default: audio = this.audioElements.find(item => item.id === `${this.language}`);
        break;
    }

    audio.currentTime = 0;
    audio.play();
  };
}

const KeysInfoMaps = [
  [192, ['`', '~', 'ё', 'Ё']],
  [49, ['1', '!', '1', '!']],
  [50, ['2', '@', '2', '"']],
  [51, ['3', '#', '3', '№']],
  [52, ['4', '$', '4', ';']],
  [53, ['5', '%', '5', '%']],
  [54, ['6', '^', '6', ':']],
  [55, ['7', '&', '7', '?']],
  [56, ['8', '*', '8', '*']],
  [57, ['9', '(', '9', '(']],
  [48, ['0', ')', '0', ')']],
  [8, { name: 'backspace', iconUrl: 'assets/backspace.svg' }],
  [20, { name: 'capslock', iconUrl: 'assets/caps-lock.svg' }],
  [81, ['q', 'Q', 'й', 'Й']],
  [87, ['w', 'W', 'ц', 'Ц']],
  [69, ['e', 'E', 'у', 'У']],
  [82, ['r', 'R', 'к', 'К']],
  [84, ['t', 'T', 'е', 'Е']],
  [89, ['y', 'Y', 'н', 'Н']],
  [85, ['u', 'U', 'г', 'Г']],
  [73, ['i', 'I', 'ш', 'Ш']],
  [79, ['o', 'O', 'щ', 'Щ']],
  [80, ['p', 'P', 'з', 'З']],
  [219, ['[', '{', 'х', 'Х']],
  [221, [']', '}', 'ъ', 'Ъ']],
  [302, { name: 'lang', iconUrl: 'assets/english.svg' }],
  [65, ['a', 'A', 'ф', 'Ф']],
  [83, ['s', 'S', 'ы', 'Ы']],
  [68, ['d', 'D', 'в', 'В']],
  [70, ['f', 'F', 'а', 'А']],
  [71, ['g', 'G', 'п', 'П']],
  [72, ['h', 'H', 'р', 'Р']],
  [74, ['j', 'J', 'о', 'О']],
  [75, ['k', 'K', 'л', 'Л']],
  [76, ['l', 'L', 'д', 'Д']],
  [186, [';', ':', 'ж', 'Ж']],
  [222, ["'", '"', 'э', 'Э']],
  [13, { name: 'enter', iconUrl: 'assets/enter.svg' }],
  [16, { name: 'shift', iconUrl: 'assets/shift.svg' }],
  [90, ['z', 'Z', 'я', 'Я']],
  [88, ['x', 'X', 'ч', 'Ч']],
  [67, ['c', 'C', 'с', 'С']],
  [86, ['v', 'V', 'м', 'М']],
  [66, ['b', 'B', 'и', 'И']],
  [78, ['n', 'N', 'т', 'Т']],
  [77, ['m', 'M', 'ь', 'Ь']],
  [188, [',', '<', 'б', 'Б']],
  [190, ['.', '>', 'ю', 'Ю']],
  [191, ['/', '?', '.', ',']],
  [301, { name: 'close', iconUrl: 'assets/close.svg' }],
  [303, { name: 'microphone', iconUrl: 'assets/microphone.svg' }],
  [32, { name: 'space', iconUrl: 'assets/space.svg' }],
  [37, { name: 'left', iconUrl: 'assets/left.svg' }],
  [39, { name: 'right', iconUrl: 'assets/right.svg' }],
  [304, { name: 'voice', iconUrl: 'assets/voice.svg' }]
];

export default function initialize() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let inputElement = document.querySelector('.input-field').querySelector('input');
  let keyboardElement = document.querySelector('.keyboard');

  (function addKeysElements(keysInfoMaps) {
    keysInfoMaps.forEach(item => {
      let button = document.createElement('button');
      button.setAttribute('id', item[0]);
      button.classList.add('key');

      if (Array.isArray(item[1])) {
        button.classList.add('keyboard__key');
        button.setAttribute('name', 'key');
        button.innerText = item[1][0];
      } else {
        button.setAttribute('name', item[1].name);
        button.innerHTML = `<img src="${item[1].iconUrl}" alt="${item[1].name}">`;
        switch (item[1].name) {
          case 'backspace': button.classList.add('keyboard__key_very-wide');
            break;
          case 'capslock':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'enter': button.classList.add('keyboard__key_enter');
            break;
          case 'microphone':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'close': button.classList.add('keyboard__key');
            break;
          case 'shift':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'lang': button.classList.add('keyboard__key');
            break;
          case 'space': button.classList.add('keyboard__key_ultra-wide');
            break;
          case 'left': button.classList.add('keyboard__key');
            break;
          case 'right': button.classList.add('keyboard__key');
            break;
          case 'voice':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          default: throw new Error('not found');
        }
      }

      keyboardElement.appendChild(button);
    });
  }(KeysInfoMaps));

  let keysElements = document.querySelectorAll('.key');
  let audioElements = document.querySelectorAll('audio');
  let keyboard = new Keyboard(KeysInfoMaps, keysElements, inputElement, audioElements);

  keyboard.initial();
  keyboard.keysElements.forEach(element => {
    element.addEventListener('click', event => keyboard.clickKey(event));
  });
  inputElement.addEventListener('click', () => {
    keyboardElement.style.display = 'grid';
  });
  window.addEventListener('keydown', event => {
    let key = keyboard.keys.get(+event.keyCode);

    if (key) {
      inputElement.focus();
      key.element.classList.add('key_click');
    }
  });
  window.addEventListener('keyup', event => {
    let key = keyboard.keys.get(+event.keyCode);

    if (key) {
      inputElement.focus();
      switch (key.name) {
        case 'capslock': keyboard.clickCapsLock(key.element);
          break;
        case 'shift': keyboard.clickShift(key.element);
          break;
        default: throw new Error('not found');
      }
      key.element.classList.remove('key_click');
    }
  });
}
