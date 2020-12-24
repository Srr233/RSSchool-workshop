import L from 'leaflet';
import DataGeoCountry from '../../data/custom-medium.geo.json';
import {
  urlTemplate,
  mapOptions,
  tileLayerOptions,
  mapContainerName,
  indicators
} from './interactive-map-constants';
import InteractiveMapModel from './interactive-map-model';
import InteractiveMapView from './interactive-map-view';
import InteractiveMapController from './interactive-map-controller';
import 'leaflet/dist/leaflet.css';

export default class InteractiveMap {
  static map;

  static tileLayer;

  static setting;

  static controller;
  
  static model;

  static async initialize(dataCovidCountry) {
    const data = this.dataPreparation(dataCovidCountry, DataGeoCountry);   

    InteractiveMap.createContainer();
    InteractiveMap.createMap();

    InteractiveMap.model = new InteractiveMapModel(data);
    const view = new InteractiveMapView(InteractiveMap.model, {
      map: InteractiveMap.map,
      setting: InteractiveMap.setting
    });
    InteractiveMap.controller = new InteractiveMapController(InteractiveMap.model, view);
  }

  static dataPreparation(dataCovidCountry, dataGeoCountry) {
    const features = dataGeoCountry.features.map((geoData) => {
      const geometry = geoData.geometry;
      const type = geoData.type;
      const properties = dataCovidCountry
        .find((covidData) => geoData.properties.iso_a3 === covidData.countryInfo.iso3);

      return {
        type: type,
        properties: properties,
        geometry: geometry
      };
    });

    return {
      type: dataGeoCountry.type,
      features: features
    };
  }

  static createMap() {
    InteractiveMap.map = new L.Map(mapContainerName, mapOptions);
    InteractiveMap.tileLayer = new L.TileLayer(urlTemplate, tileLayerOptions);

    InteractiveMap.map.addLayer(InteractiveMap.tileLayer);
    InteractiveMap.map.fitWorld();
    InteractiveMap.map.setZoom(2.5);
    InteractiveMap.map.setMaxBounds([[90, -180], [-90, 180]]);
  }

  static createContainer() {
    const container = document.createElement('div');
    InteractiveMap.createSetting();

    container.setAttribute('id', mapContainerName);
    container.appendChild(InteractiveMap.setting);
    document.querySelector('.component-interactive-map').appendChild(container);

    return container;
  }

  static createSetting() {
    const setting = document.createElement('div');
    const types = Array.from(Object.values(indicators.type)).map((item) => InteractiveMap.createRadioLabel(item, 'type'));
    const periods = Array.from(Object.values(indicators.period)).map((item) => InteractiveMap.createRadioLabel(item, 'period'));
    const magnitudes = Array.from(Object.values(indicators.magnitude)).map((item) => InteractiveMap.createRadioLabel(item, 'magnitude'));
    const header = document.createElement('h4');

    header.innerText = 'Indicators';
    setting.setAttribute('class', 'info setting');

    setting.appendChild(header);
    types.forEach((item) => {
      setting.appendChild(item.radio);
      setting.appendChild(item.label);
      setting.appendChild(document.createElement('br'));
    });
    setting.appendChild(document.createElement('hr'));
    periods.forEach((item) => {
      setting.appendChild(item.radio);
      setting.appendChild(item.label);
      setting.appendChild(document.createElement('br'));
    });
    setting.appendChild(document.createElement('hr'));
    magnitudes.forEach((item) => {
      setting.appendChild(item.radio);
      setting.appendChild(item.label);
      setting.appendChild(document.createElement('br'));
    });

    InteractiveMap.setting = setting;
  }

  static createRadioLabel(value, name) {
    const radio = document.createElement('input');
    const label = document.createElement('label');

    radio.setAttribute('type', 'radio');
    radio.setAttribute('id', value);
    radio.setAttribute('value', value);
    radio.setAttribute('name', name);
    label.setAttribute('for', value);
    label.innerText = value;

    return { radio: radio, label: label };
  }
}
