import View from './view.js';
import { forModel } from './services.js';

class Model {
  constructor(data) {
    this.view = new View();
    this.summary = data;
    this.currentCountry = {};
    this.allInfo = null;
    this.status = 'total cases';
  }

  async setAllData(info) {
    let options;
    if (info) {
      const temporary = info.split(/\s/);
      options = {
        allStatus: info,
        type: temporary[0],
        status: temporary.slice(-1),
        countries: this.allInfo,
        allCases: this.allCases,
        isOneHundred: info.includes('100k')
      };
    }
    this.view.updateTable(this.allInfo, options);
  }

  setCurrentCountry(information, code) {
    const currentCountry = this.allInfo.find(item => item.countryInfo.iso2 === code);

    let isOneHundred;
    this.status = information;
    const type = this.status.split(/\s/)[0];
    const status = this.status.split(/\s/).slice(-1).join('');
    if (this.status.includes('100k')) {
      isOneHundred = true;
    } else {
      isOneHundred = false;
    }
    const info = {
      country: currentCountry,
      status: status,
      type: type
    };

    if (currentCountry) {
      this.currentCountry = currentCountry;
      this.view.selectOne(info, isOneHundred);
    } else {
      throw new Error('Country not found!');
    }
  }

  changeInfoForOneCountry(options) {
    const copy = options;
    copy.allStatus = forModel.getNextTypeStatistics(copy.allStatus, options.direction);
    this.allStatus = copy.allStatus;
    this.status = copy.allStatus;

    const type = this.status.split(/\s/)[0];
    const status = this.status.split(/\s/).slice(-1).join('');
    copy.type = type;
    copy.status = status;
    if (this.status.includes('100k')) {
      copy.isOneHundred = true;
    } else {
      copy.isOneHundred = false;
    }
    copy.currentCountry = this.currentCountry;
    this.view.changeOneCountry(copy);
  }

  changeList(options) {
    const copy = options;
    copy.allStatus = forModel.getNextTypeStatistics(copy.allStatus, options.direction);
    this.allStatus = copy.allStatus;
    this.status = copy.allStatus;

    if (copy.allStatus.includes('100k')) {
      copy.isOneHundred = true;
    } else {
      copy.isOneHundred = false;
    }
    const allInfo = {
      allStatus: copy.allStatus,
      status: copy.allStatus.split(/\s/).slice(-1).join(''),
      type: copy.allStatus.split(/\s/)[0],
      countries: this.allInfo,
      allCases: this.allCases
    };
    this.status = copy.allStatus;
    this.view.changeList(allInfo, copy.isOneHundred);
  }

  init() {
    const json = this.summary;
    this.allInfo = json;
    this.allCases = forModel.getAllCases(this.allInfo);

    this.view.init(this.allCases.total.cases, this.allInfo, 'cases');
  }
}

export default Model;
