import left from '../../assets/left-arrow.svg';
import right from '../../assets/right-arrow.svg';

function getCurrentNameInfo(status, type) {
  const name = status + type;
  const date = {
    recoveredtotal: 'recovered',
    casestotal: 'cases',
    deathstotal: 'deaths',
    recoveredlast: 'todayRecovered',
    caseslast: 'todayCases',
    deathslast: 'todayDeaths'
  };
  return date[name];
}

const forModel = {
  getAllCases(arr) {
    const copyArg = arr.slice();
    const res = {
      total: {
        cases: 0,
        recovered: 0,
        deaths: 0,
        'total on 100k deaths': 0,
        'total on 100k recovered': 0,
        'total on 100k cases': 0
      },
      last: {
        cases: 0,
        recovered: 0,
        deaths: 0,
        'last on 100k cases': 0,
        'last on 100k deaths': 0,
        'last on 100k recovered': 0
      }
    };

    for (let i = 0; i < copyArg.length; i += 1) {
      if (copyArg[i].population !== 0) {
        res.total.cases += copyArg[i].cases;
        res.total.recovered += copyArg[i].recovered;
        res.total.deaths += copyArg[i].deaths;
        res.total['total on 100k cases'] += Math.floor(copyArg[i].cases / (copyArg[i].population / 100000));
        res.total['total on 100k deaths'] += Math.floor(copyArg[i].deaths / (copyArg[i].population / 100000));
        res.total['total on 100k recovered'] += Math.floor(copyArg[i].recovered / (copyArg[i].population / 100000));

        res.last.cases += copyArg[i].todayCases;
        res.last.recovered += copyArg[i].todayRecovered;
        res.last.deaths += copyArg[i].todayDeaths;
        res.last['last on 100k cases'] += Math.floor(copyArg[i].todayCases / (copyArg[i].population / 100000));
        res.last['last on 100k deaths'] += Math.floor(copyArg[i].todayDeaths / (copyArg[i].population / 100000));
        res.last['last on 100k recovered'] += Math.floor(copyArg[i].todayRecovered / (copyArg[i].population / 100000));
      }
    }

    return res;
  },
  getNextTypeStatistics(status, direction) {
    const statuses = [
      'total cases', 'total deaths', 'total recovered',
      'last cases', 'last deaths', 'last recovered',
      'total on 100k cases', 'total on 100k deaths',
      'total on 100k recovered', 'last on 100k cases',
      'last on 100k deaths', 'last on 100k recovered'
    ];
    const indexStatus = statuses.indexOf(status);
    let res = '';

    if (indexStatus === -1) {
      throw new Error('Not correct status!');
    }

    if (direction === 'right' && indexStatus < 11) {
      res = statuses[indexStatus + 1];
    } else if (direction === 'left' && indexStatus > 0) {
      res = statuses[indexStatus - 1];
    } else if (direction === 'right') {
      res = statuses[0];
    } else if (direction === 'left') {
      res = statuses[11];
    }
    return res;
  }
};

const forView = {
  clearChildren(element) {
    const length = element.childElementCount;
    if (!length) {
      return;
    }
    for (let i = 0; i < length; i += 1) {
      element.firstElementChild.remove();
    }
  },
  createTable(info) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ST');
    const allTableHTML = `<div class="ST__info-wrapper">
      <div class="ST__info">
        <div class="ST__info-name-wrapper">
          <span class="ST__info-name">total cases</span>
          <span class="ST__info-number">${info.toLocaleString()}</span>
        </div>
        <div class="ST__info-list">
        </div>
      </div>
      <div class="ST__info-buttons">
        <button class="ST__info-buttons__left" data-type="left">
          <div class="ST__info-buttons-img-wrapper pointerOff">
            <img class ="ST__info-buttons-img" src="${left}" alt="left arrow">
          </div>
        </button>
        <span class="ST__info-current-status">total cases</span>
        <button class="ST__info-buttons__right" data-type="right">
        <div class="ST__info-buttons-img-wrapper pointerOff">
            <img class ="ST__info-buttons-img" src="${right}" alt="left arrow">
          </div>
        </button>
      </div>
    </div>`;
    wrapper.insertAdjacentHTML('beforeend', allTableHTML);
    return wrapper;
  },
  createParagraph({
    country, number, status, code
  }) {
    const wrapper = document.createElement('p');
    wrapper.setAttribute('data-code', code);
    const allInfoHTML = `
    <span class="ST__info-list-number pointerOff">${number}</span>
    <span class="ST__info-list-status pointerOff">${status}</span>
    <span class="ST__info-list-country pointerOff">${country}</span>`;
    wrapper.insertAdjacentHTML('beforeend', allInfoHTML);
    return wrapper;
  },
  sort(arr) {
    const groups = Array.isArray(arr) ? arr : Array.from(arr);
    groups.sort((a, b) => {
      const elem1 = a.firstElementChild;
      const elem2 = b.firstElementChild;
      const text1 = elem1.textContent;
      const text2 = elem2.textContent;
      let n1 = text1.includes(',') ? text1.split(',').join('.')
        : text1.split(/\s/).join('');
      let n2 = text2.includes(',') ? text2.split(',').join('.')
        : text2.split(/\s/).join('');
      return +n2 - +n1;
    });
    return groups;
  },
  addAllChildren(parent, childrenArray) {
    const [wrapper, children] = [parent, childrenArray];

    for (let i = 0; i < children.length; i += 1) {
      wrapper.insertAdjacentElement('beforeend', children[i]);
    }
  },
  getNextTypeStatistics(type, direction) {
    const types = ['deaths', 'recovered', 'confirmed'];
    const index = types.indexOf(type);
    let res = '';
    if (direction === 'right' && index < 2) {
      res = types[index + 1];
    } else if (direction === 'left' && index > 0) {
      res = types[index - 1];
    } else if (direction === 'right') {
      res = types[0];
    } else if (direction === 'left') {
      res = types[2];
    }
    return res;
  },
  getCurrentNameInfo,
  createList(countries, status, type, isOnehundred) {
    const currentStatus = getCurrentNameInfo(status, type);
    const resArr = [];
    for (let i = 0; i < countries.length; i += 1) {
      const currentCountry = countries[i];
      if (currentCountry.countryInfo.iso2) {
        let number = 0;
        if (isOnehundred) {
          number = Math.floor(currentCountry[currentStatus] / (currentCountry.population / 100000));
        } else {
          number = Math.floor(currentCountry[currentStatus]);
        }
        const info = {
          country: currentCountry.country,
          number: number.toLocaleString(),
          status: status,
          type: type,
          code: currentCountry.countryInfo.iso2
        };
        resArr.push(info);
      }
    }
    return resArr;
  },
  changeDataAttr(element, properties) {
    if (!(properties instanceof Object)) {
      throw new Error('Properties is not object!');
    }
    const copyReference = element;
    const entries = Object.entries(properties);
    for (let i = 0; i < entries.length; i += 1) {
      copyReference.dataset[entries[i][0]] = entries[i][1];
    }
  }
};

export { forModel, forView };
