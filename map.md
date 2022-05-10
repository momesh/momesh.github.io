---
title: Map
parent: Home
nav_order: 3
---

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/assets/css/ol.css" type="text/css">
  <style>
    .map {
      height: 550px;
      width: 100%;
    }
    span.node-potential {
      color: gray;
    }
    span.node-active {
      color: blue;
    }
    span.datalink-active {
      color: green;
    }
  </style>
  <script src="/assets/js/ol.js"></script>
</head>

# Map

We are focused on bringing mesh access to the Pinnacle Lake area right now. This map will be updated in the near future with locations of our hubs, nodes, network links, and coverage estimations.

Check back soon to see how our network is growing!


<div id="momesh-map" class="map"></div>

## Legend

- <span class="node-potential">Potential Nodes</span> <span id="nodes-potential-total"></span>
- <span class="node-active">Active Nodes</span> <span id="nodes-potential-total"></span>
- <span class="datalink-active">Point to point Links</span> <span id="datalinks-total"></span>

<script type="text/javascript">
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
      switch(t) {
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
            url: '/assets/map.geojson',
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

</script>

