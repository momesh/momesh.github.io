---
title: Home
has_children: true
nav_order: 1
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


# MOMesh: Community Network

MOMesh is building a community owned and operated wireless network and WISP in Missouri, focused on connecting underserved communities.

## Join our community network!

- [**Get Connected**](/join) for reliable, community-owned internet
- [**Donate**](/donate) to help us expand the network
- [**Learn**](/docs/architecture) about how our network works

We are just getting started, and are currently building our core infrastructure. If you are interested in helping us get started, [let us know you are interested](/join)!

<div id="momesh-map" class="map"></div>
<script type="text/javascript">
  var map = new ol.Map({
    target: 'momesh-map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-91.4198, 38.8316]),
      zoom: 15
    })
  });
</script>
