import Model from './model.js';

class Controller {
  constructor(data) {
    this.model = new Model(data);
  }

  setCountry(type, period, magnitude, code) {
    const normalPeriod = period === 'today' ? 'last' : period;
    const normalMagnitude = magnitude === 'absolute' ? '' : 'on 100k ';
    const result = `${normalPeriod} ${normalMagnitude}${type}`;

    this.model.setCurrentCountry(result, code);
  }

  setGlobal(type, period, magnitude) {
    const normalPeriod = period === 'today' ? 'last' : period;
    const normalMagnitude = magnitude === 'absolute' ? '' : 'on 100k ';
    const result = `${normalPeriod} ${normalMagnitude}${type}`;

    this.model.setAllData(result);
  }

  changeType(event) {
    const target = event.target;
    let direction = target.dataset.type;
    if (!direction) return;
    const currentStatus = target.parentElement.querySelector('span').textContent;
    let status = currentStatus;
    status = status.split(' ');
    let isOne = false;
    if (status.length > 2) {
      isOne = true;
      status = [status[0], status.slice(-1).join('')];
    }
    const options = {
      type: status[0],
      direction: direction,
      status: status[1],
      allStatus: currentStatus,
      isOneHundred: isOne
    };
    const list = document.querySelector('.ST__info-list');

    if (list.childElementCount === 1) {
      this.model.changeInfoForOneCountry(options);
    } else {
      this.model.changeList(options);
    }
  }

  init() {
    this.model.init();
    this.buttonLeft = document.querySelector('.ST__info-buttons__left');
    this.buttonRight = document.querySelector('.ST__info-buttons__right');

    this.buttonLeft.addEventListener('click', this.changeType.bind(this));
    this.buttonRight.addEventListener('click', this.changeType.bind(this));

    this.changeType = this.changeType.bind(this);
  }
}

export default Controller;
