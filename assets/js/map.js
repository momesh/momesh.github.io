var target = 'momesh-map';

var nodeHubStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'blue'}),
  stroke: null,
});

var nodeStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'red'}),
  stroke: null,
});

var nodePotentialStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'gray'}),
  stroke: null,
});

var linkPTPStyle = new ol.style.Stroke({color: 'green', width: 3});

var styles = {
  'Point': new ol.style.Style({
    image: nodeHubStyle,
  }),
  'LineString': new ol.style.Style({
    stroke: linkPTPStyle,
  }),
  'MultiLineString': new ol.style.Style({
    stroke: linkPTPStyle,
  }),
  'MultiPoint': new ol.style.Style({
    image: nodeHubStyle,
  }),
  'MultiPolygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'gray',
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.05)',
    }),
  }),
  'GeometryCollection': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'magenta',
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};

var styleFunction = function (feature) {
  var color = feature.get('marker-color');
  var nn = feature.get('name');
  var t = feature.get('type');
  switch (t) {
    case 'node':
      return new ol.style.Style({image: nodeStyle});
    case 'hub':
      return new ol.style.Style({image: nodeHubStyle});
    case 'potential':
      return new ol.style.Style({image: nodePotentialStyle});
  }
  return styles[feature.getGeometry().getType()];
};

var map = new ol.Map({
  target: target,
  renderer: 'canvas',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        interpolate: true,
      })
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: '/assets/data/map.geojson',
        format: new ol.format.GeoJSON(),
      }),
      style: styleFunction,
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-91.4198, 38.8316]),
    zoom: 15
  })
});

