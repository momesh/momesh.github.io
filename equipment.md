---
title: Equipment
nav_order: 2
published: true
---

## Equipment

We use a variety of outdoor, low cost routers to create our network. See below for more details on each vendor's specifics.

### Overview

<table>
<thead>
<tr>
  <td>Model</td>
  <td>Vendor</td>
  <td>Features</td>
</tr>
</thead>

<tbody>
{% for e in site.equipment %}
<tr>
  <td><a href="{{e.url}}">{{e.model}}</a></td>
  <td>{{e.vendor}}</td>
  <td>{{e.summary}}</td>
</tr>
{% endfor %}
</tbody>
</table>
