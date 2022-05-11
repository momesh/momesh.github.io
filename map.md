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

<script src="/assets/js/map.js"></script>
