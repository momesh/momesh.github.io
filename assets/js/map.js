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
  radius: 7,
  fill: new ol.style.Fill({color: "#9A48D0"}),
  stroke: null,
});

var nodeStyle = new ol.style.Circle({
  radius: 6,
  fill: new ol.style.Fill({color: "#008DD5"}),
  stroke: null,
});

var nodePotentialStyle = new ol.style.Circle({
  radius: 5,
  fill: new ol.style.Fill({color: "#373F51"}),
  stroke: null,
});

var createNodeLabel = function (text) {
  var textStyle = new ol.style.Text({
    font: '14px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000',
    }),
    offsetY: -15,
    text: text,
    /*
    stroke: new ol.style.Stroke({
      color: '#000',
      width: 1,
    }),*/
  });

  return textStyle;
};

var linkPTPStyle = new ol.style.Stroke({color: 'rgba(0, 255, 0, 0.4)', width: 5});

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
      color: 'rgba(245,100,118,0.2)', // #F56476
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

var setElementIdHTML = function (id, val) {
  document.getElementById(id).innerHTML = val;
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
      // XXX coverage colors
      gradient.addColorStop(0.0, 'rgba(57,162,174,0.8)');
      gradient.addColorStop(0.5, 'rgba(0,0,255,0.2)');
      gradient.addColorStop(0.7, 'rgba(255,186,8,0.2)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = 'rgba(0,0,255,0.01)';
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
    case 'datalink':
      return new ol.style.Style({style: linkPTPStyle});
  }

  // fallback to render any other geometry not explicitly handled prior
  return styles[feature.getGeometry().getType()];
};

function onMoveEnd(evt) {
  //var map = evt.map;
  //console.log("move end:", map);
}

function onFeaturesLoadEnd(evt) {
  /*
  // inject map features for coverage overlay
  // from loaded features and push into computedCoverage
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
  */

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
  setElementIdHTML('active-nodes-total', (getValue(buckets, 'active-node') + getValue(buckets, 'active-hub')));
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
    // coverage bubbles layer
    // XXX
    new ol.layer.Vector({
      source: computedCoverage,
      style: coverageStyleFunction,
    }),

    // mesh node features layer
    new ol.layer.Vector({
      source: meshSource,
      style: siteStyleFunction,
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-91.4198, 38.8316]),
    zoom: 15
  })
});

// a normal select interaction to handle clicking on a feature
var getFeatureLabelText = function (feature) {
  let label = "";
  let name = feature.get('name');
  let status = feature.get('status');
  //let site = feature.get('site');
  let nn = feature.get('network_number');
  let type = feature.get('type');
  // site 22 nn 43 -> s22n43
  if (status == 'potential') {
    label = status + " " + type;
  } else if (type !== "" && nn > 0) {
    return ("" + type + " " + nn);
  }
  if (name) {
    label = name + " - " + label;
  }
  if (label === "") {
    label = "unknown";
  }
  return label;
};

// given a site feature (node), populate computedCoverage
// with the features to show coverage
var populateCoverageLayer = function (feature) {
  // TODO: handle sectors with angular coverage here - what type of geometry can we use?
  // https://openlayers.org/en/latest/apidoc/

  // wipe out collection before we start
  computedCoverage.clear();

  let r = feature.get('omni_radius_meters');
  //console.log("populate for", feature.get('id'), r);
  if (feature.get('status') !== "active" || !r) {
    return;
  }
  // only features with a radius property will be rendered as a circle
  let geo = feature.getGeometry();
  const newFeature = createMapFeatureCoverage(geo.flatCoordinates, r);
  computedCoverage.addFeature(newFeature);
};

var select = new ol.interaction.Select({
  style: function (feature) {
    // when selecting a feature, annotate it with its name
    let ogStyle = siteStyleFunction(feature);
    if (!ogStyle) {return;}
    let text = getFeatureLabelText(feature);
    ogStyle.setText(createNodeLabel(text));
    // TODO: figure out how to highlight the site
    populateCoverageLayer(feature);
    return ogStyle;
  },
});

map.addInteraction(select);

let selectedFeatures = select.getFeatures();
selectedFeatures.on(['add', 'remove', 'change'], function () {
  // as you select nodes on the map, populate the query params 'selected' field
  // XXX TODO: implement selection on map load from selected param
  const features = selectedFeatures.getArray();
  //TODO: update query params with selection
  let params = new URLSearchParams();
  // multiple selections will be encoded with a (',') between them (%2C in query params)
  params.set('selected', features.filter(function (x) {return !!x;}).map(function (x) {return x.get('id');}));

  // change the current history to reflect the selection without triggering a refresh
  if (features.length == 0) {
    window.history.replaceState(null, null, '?');
    return;
  }
  window.history.replaceState(null, null, '?' + params.toString());

  //let gb = groupFeaturesBy(features, nodeCompositeKey);
  //console.log("selected:", gb);
  //console.log("selected", params);
});

map.on('moveend', onMoveEnd);

console.log("created map", map);
