export default class ProcessTableData {
  constructor(countriesInfo, type, period, magnitude) {
    this.infoByCountries = countriesInfo;
    this.search = false;
    this.indicator = 'cases';
    this.type = type;
    this.period = period;
    this.magnitude = magnitude;

  }
  startProcessing() {
    const lastUpdated = document.querySelector(".last-updated-value");
    const lastDate = new Date(this.infoByCountries[0].updated);
    lastUpdated.textContent = lastDate.toLocaleString();
    this.countGlobalCases();
    this.sortNumbers();
    this.renderData();
    this.processIndicators();
    this.processControllers();
  }
  processIndicators() {
    if (this.type === 'cases' && this.period === 'total' && this.magnitude === 'absolute')
      this.indicator = 'cases';
    if (this.type === 'cases' && this.period === 'today' && this.magnitude === 'absolute')
      this.indicator = 'todayCases';
    if (this.type === 'cases' && this.period === 'total' && this.magnitude === 'per 100 thousand')
      this.indicator = 'casesPerOneMillion';
    if (this.type === 'cases' && this.period === 'today' && this.magnitude === 'per 100 thousand')
      this.indicator = 'todayCases1';
    if (this.type === 'deaths' && this.period === 'total' && this.magnitude === 'absolute')
      this.indicator = 'deaths';
    if (this.type === 'deaths' && this.period === 'today' && this.magnitude === 'absolute')
      this.indicator = 'todayDeaths';
    if (this.type === 'deaths' && this.period === 'total' && this.magnitude === 'per 100 thousand')
      this.indicator = 'DeathsPerOneMillion';
    if (this.type === 'deaths' && this.period === 'today' && this.magnitude === 'per 100 thousand')
      this.indicator = 'todayDeaths1';
    if (this.type === 'recovered' && this.period === 'total' && this.magnitude === 'absolute')
      this.indicator = 'recovered';
    if (this.type === 'recovered' && this.period === 'today' && this.magnitude === 'absolute')
      this.indicator = 'todayRecovered';
    if (this.type === 'recovered' && this.period === 'total' && this.magnitude === 'per 100 thousand')
      this.indicator = 'RecoveredPerOneMillion';
    if (this.type === 'recovered' && this.period === 'today' && this.magnitude === 'per 100 thousand')
      this.indicator = 'todayRecovered1';
    this.renderDataForNewIndicator();
    //this.processControllers();
  }
  processControllers() {
    const criterias = ['cases', 'deaths', 'recovered', 'todayCases', 'todayDeaths', 'todayRecovered', 'casesPerOneMillion',
      'deathsPerOneMillion', 'recoveredPerOneMillion', 'todayCases1', 'todayDeaths1', 'todayRecovered1'];
    const criteriasNames = ['Total Cases', 'Total Deathes', 'Total Recovered', 'Cases for Today', 'Deaths for Today', 'Recovered for Today',
      'Total Cases per 100,000', 'Total Deaths per 100,000', 'Total Recovered per 100,000',
      'Cases per 100,000 for today', 'Deaths per 100,000 for today', 'Recovered per 100,000 for today'];
    const globalNames = ['Global Cases', 'Global Deathes', 'Global Recovered', 'Global Cases for Today', 'Global Deaths for Today', 'Global Recovered for Today',
      'Global Cases per 100,000', 'Global Deaths per 100,000', 'Global Recovered per 100,000',
      'Global Cases per 100,000 for today', 'Global Deaths per 100,000 for today', 'Global Recovered per 100,000 for today'];
    const globalCasesTxt = document.querySelector(".global-cases-txt");
    //const globalCasesTxt = document.querySelector(".global-cases-txt");
    const arrowsWrapper = document.querySelector(".arrows-wrapper");
    const leftArrow = arrowsWrapper.querySelector("#arrow-0");
    const rightArrow = arrowsWrapper.querySelector("#arrow-1");
    const inputField = document.querySelector(".input-field");
    inputField.addEventListener("input", (e) => { this.searchData(e) });
    let index = criterias.indexOf(this.indicator);
    arrowsWrapper.childNodes[1].nodeValue = criteriasNames[index];
    globalCasesTxt.textContent = globalNames[index];
    this.clickOnCellData();
    rightArrow.addEventListener("click", () => {
      let index = criterias.indexOf(this.indicator);
      index = (index === criterias.length - 1) ? 0 : index + 1;
      this.indicator = criterias[index];
      arrowsWrapper.childNodes[1].nodeValue = criteriasNames[index];
      globalCasesTxt.textContent = globalNames[index];
      this.renderDataForNewIndicator(index);
    });
    leftArrow.addEventListener("click", () => {
      let index = criterias.indexOf(this.indicator);
      index = (index === 0) ? 0 : index - 1;
      this.indicator = criterias[index];
      arrowsWrapper.childNodes[1].nodeValue = criteriasNames[index];
      globalCasesTxt.textContent = globalNames[index];
      this.renderDataForNewIndicator(index);
    });
  }
  renderDataForNewIndicator() {
    this.sortNumbers();
    this.resetData();
    this.renderData();
    this.countGlobalCases();
    this.clickOnCellData();
  }
  clickOnCellData() {
    document.querySelectorAll(".data-cell").forEach((cellData) => {
      cellData.addEventListener("click", () => {
        if (this.search) {
          document.querySelectorAll(".data-cell").forEach((item) => {
            item.classList.toggle("hide", true);
          })
          cellData.classList.toggle("hide", false);
          this.search = false;
        };
      });
    })
  }
  countGlobalCases() {
    let total = 0;
    let crit = this.indicator;
    if (crit.includes('1')) crit = crit.slice(0, crit.length - 1);
    this.infoByCountries.forEach((value) => {
      if (value.countryInfo.iso2 === null) return;
      total += value[crit];
    });
    total = total.toLocaleString();
    document.querySelector(".global-cases-value").textContent = `${total}`;
  }
  renderData() {
    let crit = this.indicator; let sum;
    this.infoByCountries.forEach((value) => {
      if (value.countryInfo.iso2 === null) return;
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("data-cell");
      divWrapper.setAttribute("id", `${value.countryInfo.iso2}`);
      let div = document.createElement("div");
      div.classList.add("cell-value");
      if (crit.includes('Million')) {
        sum = value[crit] / 10
      } else {
        if (crit.includes('1')) {
          crit = crit.slice(0, crit.length - 1);
          sum = value[crit] / (value.population / 100000);
        } else sum = value[crit];
      }
      div.textContent = sum.toLocaleString();
      divWrapper.appendChild(div);
      div = document.createElement("div");
      div.textContent = value.country;
      divWrapper.appendChild(div);
      div = document.createElement("div");
      let img = document.createElement("img");
      div.appendChild(img);
      img.src = `https://www.countryflags.io/${value.countryInfo.iso2}/shiny/64.png`;
      img.style.width = "35px";
      img.style.height = "30px";
      divWrapper.appendChild(div);
      document.querySelector(".table-data").appendChild(divWrapper);
    });
  }
  resetData() {
    document.querySelectorAll(".data-cell").forEach((el) => el.remove());
  }
  sortNumbers() {
    let crit = this.indicator;
    if (crit.includes('1')) crit = crit.slice(0, crit.length - 1);
    this.infoByCountries.sort((a, b) => (b[crit] > a[crit]) ? 1 : -1);
  }
  searchData(e) {
    this.search = true;
    const userWord = e.target.value.toLowerCase();
    this.infoByCountries.forEach((item) => {
      const tableWord = item.country.toLowerCase();
      const countryCode = item.countryInfo.iso2;
      let cellData = document.querySelector(".table-data").querySelector(`#${countryCode}`);
      if (cellData === null) return;
      if (tableWord.includes(userWord)) {
        cellData.classList.toggle("hide", false);
      } else cellData.classList.toggle("hide", true);
    });
    if (userWord === "") this.search = false;
  }
}

// const start = new InitCasesComponent();
// start.startWork();
