const urlCovidDataApi = 'https://corona.lmao.ninja/v2/countries';
const accessToken = 'pk.eyJ1IjoiZG1pdHJ5MjAyIiwiYSI6ImNraXJreXc5OTBvcGwzMWwzeGJ3dXVrbmsifQ.cv6TNVdCaUOH5wqHSuwAMw';
const urlTemplate = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapContainerName = 'interactive-map';
const templateTileLayer = 'mapbox/light-v10';

const indicators = {
  type: {
    cases: 'cases',
    deaths: 'deaths',
    recovered: 'recovered'
  },
  period: {
    today: 'today',
    total: 'total'
  },
  magnitude: {
    absolute: 'absolute',
    per100Thousand: 'per 100 thousand'
  }
};

const grades = {
  cases: [
    { color: '#fcfbfd', value: 0 },
    { color: '#efedf5', value: 5000 },
    { color: '#dadaeb', value: 10000 },
    { color: '#bcbddc', value: 20000 },
    { color: '#9e9ac8', value: 50000 },
    { color: '#807dba', value: 100000 },
    { color: '#6a51a3', value: 200000 },
    { color: '#54278f', value: 500000 },
    { color: '#3f007d', value: 1000000 }
  ],
  deaths: [
    { color: '#fff5f0', value: 0 },
    { color: '#fee0d2', value: 500 },
    { color: '#fcbba1', value: 1000 },
    { color: '#fc9272', value: 2000 },
    { color: '#fb6a4a', value: 5000 },
    { color: '#ef3b2c', value: 10000 },
    { color: '#cb181d', value: 20000 },
    { color: '#a50f15', value: 50000 },
    { color: '#67000d', value: 100000 }
  ],
  recovered: [
    { color: '#f7fcfd', value: 0 },
    { color: '#e5f5f9', value: 2500 },
    { color: '#ccece6', value: 5000 },
    { color: '#99d8c9', value: 10000 },
    { color: '#66c2a4', value: 20000 },
    { color: '#41ae76', value: 50000 },
    { color: '#238b45', value: 100000 },
    { color: '#006d2c', value: 200000 },
    { color: '#00441b', value: 500000 }
  ]
};

const mapOptions = {
  zoomSnap: 0.25,
  minZoom: 1
};
const tileLayerOptions = {
  attribution: attribution,
  maxZoom: 12,
  id: templateTileLayer,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: accessToken
};

export {
  urlCovidDataApi,
  urlTemplate,
  mapOptions,
  tileLayerOptions,
  mapContainerName,
  indicators,
  grades
};
