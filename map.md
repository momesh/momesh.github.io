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
  </style>
  <script src="/assets/js/ol.js"></script>
</head>

# Map

We are focused on bringing mesh access to the Pinnacle Lake area right now. This map will be updated in the near future with locations of our hubs, nodes, network links, and coverage estimations.

Check back soon to see how our network is growing!


<div id="momesh-map" class="map"></div>
<script type="text/javascript">
  var target = 'momesh-map';


  var styleFunction = function(feature) {
    return new ol.style.Style({
      image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: '#fff',
          }),
          fill: new ol.style.Fill({
            color: '#3399CC',
          }),
        }),
      text: new ol.style.Text({
        text: "nn123",
        fill: new ol.style.Fill({color: '#000'}),
      }),
    });
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
      //new ol.layer.Vector({
      //  source: new ol.source.Vector({
      //    url: '/public/anonymous-network.kml',
      //    format: new ol.format.KML({
      //      extractStyles: false,
      //    }),
      //  }),
      //}),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-91.4198, 38.8316]),
      zoom: 15
    })
  });

</script>
