---
title: Status
nav_order: 999
---

# Network Status

Current status: <span style="color:green; font-weight:bold">Online</span>

### Updates

{{site.categories.inspect}}

{% if site.categories['status'].empty? %}
_no updates_
{% endif %}

<ul>
{% for post in site.categories['status'] %}
<li>{{post.date | date_to_string}} - <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

