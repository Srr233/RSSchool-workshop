import L from 'leaflet';
import EventEmitter from '../event-emitter';
import { indicators } from './interactive-map-constants';

export default class InteractiveMapView {
  model;

  geoJsonLayer;

  info;

  legend;

  elements;

  #inputs;

  #emitter;

  constructor(model, elements) {
    this.model = model;
    this.elements = elements;
    this.#inputs = elements.setting.querySelectorAll('input');
    this.#emitter = new EventEmitter();

    this.changeIndicatorInputs();
    this.changeLayerMap();

    this.model.emitter.on('changeIndicatorInputs', () => this.changeIndicatorInputs());
    this.model.emitter.on('changeMap', () => this.changeLayerMap());
    this.model.emitter.on('selectCountryOnMap', (code) => this.selectCountryOnMap(code));

    this.#inputs.forEach((input) => {
      input.addEventListener('change', (event) => this.#emitter.emit('inputChange', event));
    });
  }

  get emitter() {
    return this.#emitter;
  }

  changeLayerMap() {
    const data = this.model.data;
    let map = this.elements.map;

    if (this.geoJsonLayer) {
      map.removeLayer(this.geoJsonLayer);
      map.removeControl(this.info);
      map.removeControl(this.legend);
    }

    this.geoJsonLayer = L.geoJson(data, {
      style: (feature) => { return this.getStyle(feature); },
      onEachFeature: (feature, layer) => { this.onEachFeature(feature, layer); }
    });
    this.info = this.createInfo();
    this.legend = this.createLegend();

    this.geoJsonLayer.addTo(map);
    this.info.addTo(map);
    this.legend.addTo(map);
  }

  changeIndicatorInputs() {
    this.#inputs.forEach((input) => {
      const radio = input;

      radio.checked = false;

      if (radio.value === this.model.type) radio.checked = true;
      if (radio.value === this.model.period) radio.checked = true;
      if (radio.value === this.model.magnitude) radio.checked = true;
    });
  }

  selectCountryOnMap(code) {
    if (code === 'global') {
      this.elements.map.fitWorld();
    }

    const country = this.model.data.features
      .find((item) => item.properties && item.properties.countryInfo.iso2 === code);

    if (!country) return;

    const latLong = [
      country.properties.countryInfo.lat,
      country.properties.countryInfo.long
    ];

    this.elements.map.setView(latLong, this.elements.map.getZoom());
  }

  createInfo() {
    let info = L.control();

    info.update = (properties) => {
      const innerHTML = properties
        ? ''.concat(`<span><b>${properties.continent}<br>${properties.country}</b><span>`)
          .concat(`<br><span>${this.model.type}: ${this.calcValue(properties)}</span>`)
        : '<span>Hover over a state</span>';

      info.container.innerHTML = `<h4>Information on COVID-19</h4>${innerHTML}`;
    };

    info.onAdd = () => {
      info.container = L.DomUtil.create('div', 'info');
      info.update();
      return info.container;
    };

    return info;
  }

  calcValue(properties) {
    let value = properties[this.model.type];

    if (this.model.period === indicators.period.today) {
      const key = `today${this.model.type[0].toUpperCase()}${this.model.type.slice(1)}`;
      value = properties[key];
    }

    if (this.model.magnitude === indicators.magnitude.per100Thousand) {
      value /= properties.population / 100000;
    }

    return Math.floor(value * 100) / 100;
  }

  createLegend() {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const container = L.DomUtil.create('div', 'info legend');
      const grade = Array.from(this.model.grades).reverse();

      container.innerHTML = '<h4>Legend</h4>';
      container.innerHTML += `<i style="background:${grade[0].color}"></i><span>${grade[0].value} &plus;</span><br>`;
      for (let index = 1; index < grade.length; index += 1) {
        container.innerHTML
          += `<i style="background:${grade[index].color}"></i><span>${grade[index].value} &ndash; ${grade[index - 1].value}</span><br>`;
      }
      container.innerHTML += '<i style="background: #000000"></i><span>&ndash; no information</span><br>';

      return container;
    };

    return legend;
  }

  highlightFeature(event) {
    const layer = event.target;

    layer.setStyle({
      weight: 6,
      color: layer.options.fillColor,
      dashArray: '',
      fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.info.update(layer.feature.properties);
  }

  resetHighlight(event) {
    this.geoJsonLayer.resetStyle(event.target);
    this.info.update();
  }

  moveToFeature(event) {
    const layer = event.target;
    const latLong = layer.feature.properties
      ? [layer.feature.properties.countryInfo.lat, layer.feature.properties.countryInfo.long]
      : layer.getCenter();
    const code = layer.feature.properties ? layer.feature.properties.countryInfo.iso2 : '';
    const info = document.querySelectorAll('.info')[1];

    info.setAttribute('code', code);
    this.elements.map.setView(latLong, this.elements.map.getZoom());
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: (event) => { this.highlightFeature(event); },
      mouseout: (event) => { this.resetHighlight(event); },
      click: (event) => { this.moveToFeature(event); }
    });
  }

  getStyle(feature) {
    const grades = this.model.grades;
    const getColor = (value, grade) => {
      if (value > grade[8].value) return grade[8].color;
      if (value > grade[7].value) return grade[7].color;
      if (value > grade[6].value) return grade[6].color;
      if (value > grade[5].value) return grade[5].color;
      if (value > grade[4].value) return grade[4].color;
      if (value > grade[3].value) return grade[3].color;
      if (value > grade[2].value) return grade[2].color;
      if (value > grade[1].value) return grade[1].color;
      return grade[0].color;
    };
    const color = feature.properties
      ? getColor(this.calcValue(feature.properties), grades)
      : '#000000';

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      dashArray: '',
      fillOpacity: 0.75
    };
  }
}
