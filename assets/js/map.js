var groupFeaturesBy = function (xs, keyFn) {
  return xs.reduce(function (rv, x) {
    (rv[keyFn(x)] = rv[keyFn(x)] || []).push(x);
    return rv;
  }, {});
};

var target = 'momesh-map';
var nodeCompositeKey = function (feature) {
  return feature.get('status') + "-" + feature.get('type');
};

var nodeHubCircle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'magenta'}),
  stroke: null,
});

var nodeCircle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'blue'}),
  stroke: null,
});

var nodePotentialCircle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'gray'}),
  stroke: null,
});


var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

var datalinkPTPStroke = new ol.style.Stroke({color: 'rgba(0, 255, 0, 0.4)', width: 5});

var styles = {
  'Point': new ol.style.Style({
    image: nodeHubCircle,
  }),
  'LineString': new ol.style.Style({
    stroke: datalinkPTPStroke,
  }),
  'MultiLineString': new ol.style.Style({
    stroke: datalinkPTPStroke,
  }),
  'MultiPoint': new ol.style.Style({
    image: nodeHubCircle,
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
  // TODO: handle other features other than points
  // TODO: handle override marker-color per feature
  // var color = feature.get('marker-color');
  var nn = feature.get('name');
  var t = feature.get('type');
  var s = feature.get('status');
  switch (s) {
    case 'potential':
      return new ol.style.Style({image: nodePotentialCircle});
    default:
      switch (t) {
        case 'node':
          return new ol.style.Style({image: nodeCircle});
        case 'hub':
          return new ol.style.Style({image: nodeHubCircle});
        case 'datalink':
          return new ol.style.Style({style: datalinkPTPStroke});
      }
  }
  return styles[feature.getGeometry().getType()];
};

function onMapMove(evt) {
  // TODO: figure out how many nodes are visible in viewport?
  var map = evt.map;
}

function onFeaturesLoadEnd(evt) {
  // update legend based on evt.features properties
  // group features by properties.get('type') and 'status'
  // count active hubs, nodes, planned
  var buckets = groupFeaturesBy(evt.features, nodeCompositeKey);
  var elems = {
    'potential-nodes-total': 'potential-node',
    'active-nodes-total': 'active-node',
    'active-hubs-total': 'active-hub',
  };
  var setElementIdHTML = function (id, val) {
    document.getElementById(id).innerHTML = val;
  };
  var getValue = function (coll, key) {
    if (key in coll) {
      return coll[key].length;
    } else {
      return 0;
    }
  };

  setElementIdHTML('potential-nodes-total', getValue(buckets, 'potential-node'));
  setElementIdHTML('active-nodes-total', getValue(buckets, 'active-node'));
  setElementIdHTML('active-hubs-total', getValue(buckets, 'active-hub'));
}

var meshSource = new ol.source.Vector({
  url: '/assets/data/map.geojson',
  format: new ol.format.GeoJSON(),
});

meshSource.on('featuresloadend', onFeaturesLoadEnd);

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
      source: meshSource,
      style: styleFunction,
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-91.4198, 38.8316]),
    zoom: 15
  })
});

map.on('moveend', onMapMove);

console.log("created map", map);
