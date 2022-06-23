/* 
 * Documentation:
 * - https://openlayers.org/en/latest/apidoc/
 *
 * TODO:
 * - support angular coverage of sector aps
 * - support toggling coverage on/off, highlight node coverage on hover
 */
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

// create a feature showing approximate coverage of installed APs at site
// returns a ol.Feature object
var createMapFeatureCoverage = function (geom, radius) {
  const feature = new ol.Feature({
    geometry: new ol.geom.Circle(geom, radius),
    //geometry: new ol.geom.Circle(ol.proj.fromLonLat([-91.4198, 38.8316]), radius),
  });
  return feature;
};

// render the style for a feature that has a coverage bubble or arc
var coverageStyleFunction = function (feature) {
  // TODO: figure out how to set zindex so coverage doesnt obscure nodes
  return new ol.style.Style({
    renderer(coordinates, state) {
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius * 1.4;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius
      );
      gradient.addColorStop(0, 'rgba(0,0,255,0.5)');
      gradient.addColorStop(0.6, 'rgba(0,0,255,0.2)');
      gradient.addColorStop(1, 'rgba(0,0,255,0)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = 'rgba(0,0,255,0.4)';
      ctx.stroke();
    },
  });
};


var siteStyleFunction = function (feature) {
  // TODO: handle other features other than points
  // TODO: handle override marker-color per feature
  // var color = feature.get('marker-color');
  var nn = feature.get('name');
  var t = feature.get('type');
  var s = feature.get('status');
  switch (s) {
    // require known statuses to be listed on map
    case 'potential':
      return new ol.style.Style({image: nodePotentialStyle});
    case 'active': // require these statuses, otherwise dont show anything
      // fallthrough
      break;
    default:
      // any not explicitly listed status does not display
      return;
  }

  switch (t) {
    case 'node':
      return new ol.style.Style({image: nodeStyle});
    case 'hub':
      return new ol.style.Style({image: nodeHubStyle});
  }

  // fallback to render any other geometry not explicitly handled prior
  return styles[feature.getGeometry().getType()];
};

function onMoveEnd(evt) {
  //var map = evt.map;
  //console.log("move end:", map);
}

function onFeaturesLoadEnd(evt) {
  // compute coverage features from loaded features and push into computedCoverage
  meshSource.forEachFeature(function (feature) {
    let r = feature.get('radius');
    if (r) {
      // only features with a radius property will be rendered as a circle
      // TODO: handle sectors with angular coverage here
      let geo = feature.getGeometry();
      const newFeature = createMapFeatureCoverage(geo.flatCoordinates, r);
      computedCoverage.addFeature(newFeature);
    }
  });

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

var computedCoverage = new ol.source.Vector({
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
      style: siteStyleFunction,
    }),
    // TODO: uncomment to render coverage bubbles
    /*
    new ol.layer.Vector({
      source: computedCoverage,
      style: coverageStyleFunction,
    }),
    */
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-91.4198, 38.8316]),
    zoom: 15
  })
});

map.on('moveend', onMoveEnd);

console.log("created map", map);
