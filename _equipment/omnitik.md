---
title: Omnitik 5AC PoE
layout: equipment
parent: Equipment

model: Omnitik 5AC PoE
vendor: Mikrotik
summary: Access point, mesh router
msrp: $129
protocols:
- 802.11ac
features:
- router
- mesh
- access point
- singleband
frequencies:
- 5GHz
range_meters: 250
power_req: 28v
vendor_url: "https://mikrotik.com/product/rbomnitikpg_5hacd"
purchase_url: "https://www.balticnetworks.com/mikrotik-omnitik-5-ac-5ghz-802-11ac-2-5-dbi-gigabit-access-point-w-poe-output-us"
---

Used as a router, access point, PoE distribution hub. Typically this device is the brains of each small to medium sized node and hub. It accepts 28v PoE on ether1, and can passthrough the same voltage to ether2-5. We use this to provide the 24v required by Ubiquiti gear attached to the Omnitik, in order to simplify power distribution for complicated hub configurations.

Our Omnitik configurations create mesh connections with neighbors, typically within a range of a few blocks (~600ft). This can serve as the primary backhaul connection for a node, or act as a supplemental/backup connection for when the primary PTP router connection fails (i.e. in heavy snow). For connections between Omnitiks past a few blocks, we recommend using a louder and more directional device, as the omnidirectional antenna in an Omnitik is less well suited for long range connections.
