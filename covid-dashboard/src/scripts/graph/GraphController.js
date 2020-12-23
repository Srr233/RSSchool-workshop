import GraphComponent from './Graph-component.js';
import services from './services.js';

export default class GraphController {
  constructor() {
    this.apiUrlWorld = 'https://corona-api.com/timeline';
    this.apiUrlCountries = 'https://api.covid19api.com/total/country/';
    this.apiUrl = 'https://api.covid19api.com/countries';
    this.apiPopulation = 'https://disease.sh/v3/covid-19/countries';
  }

  initialize() {
    this.graphComponent = new GraphComponent();
    this.graphComponent.initialize();

    this.navigation = this.graphComponent.navigation;
    this.navigation.addEventListener('click', (event) => {
      this.handleEvent(event.target);
    });

    this.modalMenu = this.graphComponent.modalMenu;
    this.modalMenu.addEventListener('click', (event) => {
      this.handleModalMenuEvent(event.target);
    });

    document.body.addEventListener('click', (event) => {
      if (!event.target.className.includes('modal-title')
        && !event.target.className.includes('modal')
        && !event.target.className.includes('nav-item')) {
        this.modalMenu.classList.remove('active');
      }
    });

    this.navItemsArray = Object.values(this.navigation.children).filter((element) => {
      return element.className.includes('nav-item');
    });

    const graphComponentChildren = this.graphComponent.graphDiv.children;
    this.chartsArray = Object.values(graphComponentChildren).filter((element) => {
      return element.className.includes('chart');
    });

    this.buildCharts();
  }

  buildCharts(countryCode) {
    if (countryCode) {
      fetch(this.apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cnt = data.find((elem) => elem.ISO2 === countryCode);
          this.buildChartsFor(this.apiUrlCountries + this.cnt.Slug, countryCode);
        });
    } else {
      this.buildGlobalCharts();
    }
  }

  buildChartsFor(url, countryCode) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const isGlobal = false;
        this.graphComponent.showData(data, isGlobal);
        this.buildChartsPer100K(data, countryCode);
      });
  }

  buildGlobalCharts() {
    fetch(this.apiUrlWorld)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const isGlobal = true;
        this.graphComponent.showData(data.data, isGlobal);
        this.graphComponent.showDataPer100K(data.data);
      });
  }

  buildChartsPer100K(covidData, countryCode) {
    fetch(this.apiPopulation)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const currentCountry = data.find((elem) => elem.countryInfo.iso2 === countryCode);
        this.graphComponent.showDataPer100K(covidData, currentCountry.population);
      });
  }

  handleEvent(target) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    if (target.className.includes('nav-item')) {
      this.showModalMenu();
    }

    if (target.className.includes('left')) {
      services.handleNavArrows('left', activeNavItemIndex, this.navItemsArray, this.chartsArray);
    }

    if (target.className.includes('right')) {
      services.handleNavArrows('right', activeNavItemIndex, this.navItemsArray, this.chartsArray);
    }
    services.setNavAttribute(this.navigation);
  }

  showModalMenu() {
    this.modalMenu.classList.toggle('active');
  }

  handleModalMenuEvent(target) {
    if (target.className.includes('cases-modal')) {
      this.switchChart('cases', 'absolute');
      this.showModalMenu();
    }
    if (target.className.includes('deaths-modal')) {
      this.switchChart('deaths', 'absolute');
      this.showModalMenu();
    }
    if (target.className.includes('recovered-modal')) {
      this.switchChart('recovered', 'absolute');
      this.showModalMenu();
    }
    if (target.className.includes('cases-per100K-modal')) {
      this.switchChart('cases', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.className.includes('deaths-per100K-modal')) {
      this.switchChart('deaths', 'per 100 thousand');
      this.showModalMenu();
    }
    if (target.className.includes('recovered-per100K-modal')) {
      this.switchChart('recovered', 'per 100 thousand');
      this.showModalMenu();
    }
  }

  switchChart(caseType, magnitude) {
    const activeNavItemIndex = this.navItemsArray.findIndex((elem) => elem.className.includes('active'));
    this.navItemsArray[activeNavItemIndex].classList.remove('active');
    this.chartsArray[activeNavItemIndex].classList.remove('active');

    if (caseType === 'cases' && magnitude === 'absolute') {
      this.navItemsArray[0].classList.add('active');
      this.chartsArray[0].classList.add('active');
    }
    if (caseType === 'deaths' && magnitude === 'absolute') {
      this.navItemsArray[1].classList.add('active');
      this.chartsArray[1].classList.add('active');
    }
    if (caseType === 'recovered' && magnitude === 'absolute') {
      this.navItemsArray[2].classList.add('active');
      this.chartsArray[2].classList.add('active');
    }

    if (caseType === 'cases' && magnitude === 'per 100 thousand') {
      this.navItemsArray[3].classList.add('active');
      this.chartsArray[3].classList.add('active');
    }
    if (caseType === 'deaths' && magnitude === 'per 100 thousand') {
      this.navItemsArray[4].classList.add('active');
      this.chartsArray[4].classList.add('active');
    }
    if (caseType === 'recovered' && magnitude === 'per 100 thousand') {
      this.navItemsArray[5].classList.add('active');
      this.chartsArray[5].classList.add('active');
    }
    services.setNavAttribute(this.navigation);
  }
}
