var groupFeaturesBy = function (xs, keyFn) {
  return xs.reduce(function (rv, x) {
    (rv[keyFn(x)] = rv[keyFn(x)] || []).push(x);
    return rv;
  }, {});
};

var target = 'momesh-map'; // the target div for the map

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


var createNodeLabel = function (text) {
  var textStyle = new ol.style.Text({
    font: '12px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000',
    }),
    offsetY: -15,
    text: text,
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3,
    }),
  });

  return textStyle;
};

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
  // TODO: handle override marker-color per feature?
  // var color = feature.get('marker-color');
  //var nn = feature.get('nn');     // network number, only if node is active
  var t = feature.get('type');    // node, hub, datalink
  var s = feature.get('status');  // active, potential
  //var site = feature.get('site'); // site identifier
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

var setElementIdHTML = function (id, val) {
  document.getElementById(id).innerHTML = val;
};

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

// a normal select interaction to handle clicking on a feature

var select = new ol.interaction.Select({
  style: function (feature) {
    // when selecting a feature, annotate it with its name
    let ogStyle = styleFunction(feature);
    let text = '';
    switch (feature.get('status')) {
      case 'potential':
        text = 'potential';
        break;
      default:
        if (feature.get('name')) {
          text = feature.get('name');
        } else {
          let site = feature.get('site') || '?';
          let nn = feature.get('nn') || '?';
          // site 22 nn 43 -> s22n43
          text = "s" + site + "n" + nn;
        }
    }
    ogStyle.setText(createNodeLabel(text));
    return ogStyle;
  },
});

map.addInteraction(select);

let selectedFeatures = select.getFeatures();
selectedFeatures.on(['add', 'remove', 'change'], function () {
  const features = selectedFeatures.getArray();
  //TODO: update query params with selection
  let params = new URLSearchParams();
  // multiple selections will be encoded with a (',') between them (%2C in query params)
  params.set('selected', features.map(function (x) {return x.get('nn');}));

  // change the current history to reflect the selection without triggering a refresh
  if (features.length == 0) {
    window.history.replaceState(null, null, '?');
    return;
  }
  window.history.replaceState(null, null, '?' + params.toString());

  //let gb = groupFeaturesBy(features, nodeCompositeKey);
  //console.log("selected:", gb);
});

// on page load, restore select features that are indicated via query params
let params = new URLSearchParams(window.location.search);
let selRaw = params.get('selected');
if (selRaw) {
  let ids = selRaw.split(',');
  // TODO: handle empty ids
  for (idx in ids) {
    let nn = ids[idx];
    console.log("TODO! need to mark nn", nn, "selected in map on page load");
  }
}
