---
title: Status
nav_order: 999
---

# Network Status

Current status: <span style="color:green; font-weight:bold">Online</span>

### Updates

{% if site.updates.empty? %}
_no updates_
{% endif %}

<ul>
{% assign updates = site.updates | sort | reverse %}
{% for update in updates %}
<li>{{update.date | date_to_string}} - <a href="{{ update.url }}">{{ update.title }}</a></li>
{% endfor %}
</ul>
