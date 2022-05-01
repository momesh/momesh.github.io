---
title: Hubs
parent: Architecture
grand_parent: Docs
---

# Hubs

A Hub is a [node](./nodes) on steroids, with additional radios for further distribution of the mesh.

## Small Hub

Typically, a small hub looks like a regular node, with some sectors added, and maybe a bigger PTP router:

- 1x [Omnitik](/equipment/mikrotik/omnitik): meshes with nearby omnitiks, serves as access point and power distribution.
- 3x [LAP-120](/equipment/ubiquiti/lap120): 120 degree sectors to provide access to other nodes
- 1x [Gigabeam](/equipment/ubiquiti/gbep): A higher speed PTP to another hub for uplink (typically replaces/augments a Litebeam)

