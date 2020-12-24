import ProcessTableData from './cases-for-countries';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
import keyboardKey from '../../assets/keyboard-key.svg';

export default class InitCasesComponent {
  list;

  constructor(data) {
    this.countriesDataList = data;
  }

  startWork(type, period, magnitude) {
    this.makeComponentLayout();
    const process = new ProcessTableData(this.countriesDataList, type, period, magnitude);
    this.list = process;
    process.startProcessing();
  }

  makeComponentLayout() {
    // const pageWrapper = document.createElement('div');
    const pageWrapper = document.querySelector('.component-cases-for-countries');
    const globalCases = document.createElement('div');
    const globalCasesTxt = document.createElement('h3');
    const globalCasesVal = document.createElement('div');
    const dataTableHeader = document.createElement('h3');
    // const menuWrapper = document.createElement('div');
    const inputWrapper = document.createElement('div');
    // const keyboardButton = document.createElement('button');
    const dataTableWrapper = document.createElement('div');
    const arrowsWrapper = document.createElement('div');
    const lastUpdatedWrapper = document.createElement('div');
    const lastUpdatedTxt = document.createElement('div');
    const lastUpdatedValue = document.createElement('div');
    let txt = document.createTextNode('Total Cases');
    const lArrow = document.createElement('img');
    const rArrow = document.createElement('img');
    pageWrapper.classList.add('page-wrapper');
    pageWrapper.appendChild(lastUpdatedWrapper);
    globalCasesVal.classList.add('global-cases-value');
    globalCasesTxt.classList.add('global-cases-txt');
    globalCases.classList.add('global-cases');
    dataTableHeader.classList.add('table-header');

    const imgKeyboardKey = document.createElement('img');
    imgKeyboardKey.setAttribute('src', keyboardKey);
    imgKeyboardKey.setAttribute('alt', 'keyboard');
    imgKeyboardKey.setAttribute('id', 'keyboard');

    imgKeyboardKey.addEventListener('click', () => {
      const keyboard = document.querySelector('.keyboard');

      if (keyboard.getAttribute('close')) {
        keyboard.setAttribute('close', '');
      } else {
        keyboard.setAttribute('close', 'true');
      }
    });

    inputWrapper.classList.add('input-field');
    dataTableWrapper.classList.add('table-data');
    lArrow.setAttribute('id', 'arrow-0');
    lArrow.setAttribute('src', `${leftArrow}`);
    rArrow.setAttribute('id', 'arrow-1');
    rArrow.setAttribute('src', `${rightArrow}`);
    arrowsWrapper.classList.add('arrows-wrapper');
    // menuWrapper.classList.add('menu-wrapper');
    // keyboardButton.classList.add('keyboard-button');
    lastUpdatedWrapper.classList.add('last-updated-wrapper');
    lastUpdatedValue.classList.add('last-updated-value');
    lastUpdatedTxt.classList.add('last-updated-txt');
    // menuWrapper.appendChild(inputWrapper);
    // menuWrapper.appendChild(keyboardButton);
    arrowsWrapper.appendChild(lArrow);
    arrowsWrapper.appendChild(txt);
    arrowsWrapper.appendChild(rArrow);
    lastUpdatedWrapper.appendChild(lastUpdatedTxt);
    lastUpdatedWrapper.appendChild(lastUpdatedValue);
    globalCases.appendChild(globalCasesTxt);
    globalCases.appendChild(globalCasesVal);
    pageWrapper.appendChild(globalCases);
    pageWrapper.appendChild(dataTableHeader);
    // pageWrapper.appendChild(menuWrapper);
    pageWrapper.appendChild(inputWrapper);
    pageWrapper.appendChild(dataTableWrapper);
    pageWrapper.appendChild(arrowsWrapper);
    // document.body.appendChild(pageWrapper);
    globalCasesTxt.textContent = 'Global Cases';
    // dataTableHeader.textContent = 'Cases by Country/Region/Sovereignty';
    // lastUpdatedTxt.textContent = 'Last Updated at (M/D/YYYY)';
    let inputField = document.createElement('INPUT');
    inputField.setAttribute('placeholder', 'Search');
    inputWrapper.appendChild(inputField);
    inputWrapper.appendChild(imgKeyboardKey);
  }
}
