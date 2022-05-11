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

var nodeHubStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'magenta'}),
  stroke: null,
});

var nodeStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: 'blue'}),
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
  // TODO: handle other features other than points
  // TODO: handle override marker-color per feature
  // var color = feature.get('marker-color');
  var nn = feature.get('name');
  var t = feature.get('type');
  var s = feature.get('status');
  if (s == 'potential') {
    return new ol.style.Style({image: nodePotentialStyle});
  }
  switch (t) {
    case 'node':
      return new ol.style.Style({image: nodeStyle});
    case 'hub':
      return new ol.style.Style({image: nodeHubStyle});
  }
  return styles[feature.getGeometry().getType()];
};

function onMoveEnd(evt) {
  var map = evt.map;
  console.log("move end:", map);
}

function onFeaturesLoadEnd(evt) {
  // update legend based on evt.features properties
  // group features by properties.get('type') and 'status'
  // count active hubs, nodes, planned
  var buckets = groupFeaturesBy(evt.features, nodeCompositeKey);
  console.log("features end", buckets);
  var elems = {
    'potential-nodes-total': 'potential-node',
    'active-nodes-total': 'active-node',
    'active-hubs-total': 'active-hub',
  };
  var setElementIdHTML = function (id, val) {
    console.log(id);
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

map.on('moveend', onMoveEnd);

console.log("created map", map);
//map.layers[1].addListener('featuresloadend', function (x) {
//});
