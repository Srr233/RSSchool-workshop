import { forView } from './services.js';

class View {
  constructor() {
    this.wrapperTable = document.querySelector('.component-statistics-table');
    this.table = null;
  }

  changeList(options, isOneHundred) {
    const {
      type, status, allStatus, allCases, countries
    } = options;
    this.table.querySelector('.ST__info-current-status').textContent = allStatus;
    this.table.querySelector('.ST__info-name').textContent = allStatus;
    this.table.querySelector('.ST__info-current-status').textContent = allStatus;
    this.table.querySelector('.ST__info-name').textContent = allStatus;
    if (isOneHundred) {
      this.table.querySelector('.ST__info-number').textContent = allCases[type][allStatus].toLocaleString();
    } else {
      this.table.querySelector('.ST__info-number').textContent = allCases[type][status].toLocaleString();
    }

    const newList = forView.createList(countries, status, type, isOneHundred);
    forView.clearChildren(this.listInfo);

    newList.forEach(item => {
      const forLast = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forLast);
    });
    const forInfo = forView.sort(this.listInfo.children);
    forView.clearChildren(this.listInfo);
    forView.addAllChildren(this.listInfo, forInfo);

    forView.changeDataAttr(this.wrapperButtons, {
      type: Array.isArray(status) ? status.join('') : status,
      period: type === 'last' ? 'today' : 'total',
      magnitude: isOneHundred ? 'per 100 thousand' : 'absolute'
    });
  }

  changeOneCountry(options) {
    this.table.querySelector('.ST__info-current-status').textContent = options.allStatus;
    this.table.querySelector('.ST__info-name').textContent = options.allStatus;
    this.table.querySelector('.ST__info-current-status').textContent = options.allStatus;
    this.table.querySelector('.ST__info-name').textContent = options.allStatus;
    const newList = forView.createList([options.currentCountry],
      options.status, options.type, options.isOneHundred);

    forView.clearChildren(this.listInfo);

    newList.forEach(item => {
      const forLast = forView.createParagraph(item);
      this.table.querySelector('.ST__info-number').textContent = item.number;
      this.listInfo.insertAdjacentElement('beforeend', forLast);
    });
    forView.changeDataAttr(this.wrapperButtons, {
      type: Array.isArray(options.status) ? options.status.join('') : options.status,
      period: options.type === 'last' ? 'today' : 'total',
      magnitude: options.isOneHundred ? 'per 100 thousand' : 'absolute'
    });
  }

  updateTable(json, info) {
    if (info) {
      this.changeList(info, info.isOneHundred);
    } else {
      forView.clearChildren(this.table.parentElement);
      this.init(json);
    }
  }

  selectOne(options, isOneHundred) {
    const newList = forView.createList([options.country], options.status, options.type,
      isOneHundred);
    forView.clearChildren(this.listInfo);

    newList.forEach(item => {
      const forInfo = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forInfo);
      this.table.querySelector('.ST__info-number').textContent = item.number;
    });

    forView.changeDataAttr(this.wrapperButtons, {
      type: Array.isArray(options.status) ? options.status.join('') : options.status,
      period: options.type === 'last' ? 'today' : 'total',
      magnitude: isOneHundred ? 'per 100 thousand' : 'absolute'
    });
  }

  init(globalInfo, countries, status) {
    const arrCountries = countries;
    const key = status;

    this.table = forView.createTable(globalInfo);
    this.wrapperTable.insertAdjacentElement('beforeend', this.table);
    this.listInfo = document.querySelector('.ST__info-list');
    this.wrapperButtons = document.querySelector('.ST__info-buttons');
    const newList = forView.createList(arrCountries, key, 'total');

    newList.forEach(item => {
      const forInfo = forView.createParagraph(item);
      this.listInfo.insertAdjacentElement('beforeend', forInfo);
    });
    const list = forView.sort(this.listInfo.children);

    forView.clearChildren(this.listInfo);
    forView.addAllChildren(this.listInfo, list);
    forView.changeDataAttr(this.wrapperButtons, {
      type: 'cases',
      period: 'total',
      magnitude: 'absolute'
    });
  }
}

export default View;
