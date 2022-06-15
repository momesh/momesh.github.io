---
title: Hubs
layout: docs
parent: Documentation
---

# Hubs

A Hub is a [node](./nodes) on steroids, with additional radios for further distribution of the mesh. We typically use Airmax radios at hubs to allow [LiteBeams](/equipment/lbe) to connect to the mesh.

## Small Hub

Typically, a small hub looks like a regular node, with some directional sectors antennas added, and a larger PTP router for uplink:

- 1x [Omnitik](/equipment/omnitik): ($130/ea) meshes with nearby omnitiks, serves as access point and power distribution.
- 3x [LAP-120](/equipment/lap120): ($99/ea) 120 degree sectors to provide access to other downstream members via Airmax
- 1x [Gigabeam](/equipment/gbep): ($179/ea) A higher speed PTP to another hub for uplink (typically replaces/augments a [LiteBeam](/equipment/lbe))

Downstream members will be able to connect to a hub's sectors from 10s of km away, and the larger uplink device allows multiple members to get online through the hub without congestion.

### Diagram

A typical hub may look like the following:

```
┌─────────────────────────────┐                  ┌──────────────────┐
│                             │                  │                  │
│                             │     Mesh         │   ┌──────────┐   │
│           ┌─────────┐       │◄────────────────►│   │ LiteBeam ├─┐ │
│      ┌────┤ LAP-120 │       │                  │   └──────────┘ │ │
│      │    ├─────────┤       │                  │                │ │
│      ├────┤ LAP-120 │       │     Wifi         │   ┌─────────┐  │ │
│      │    ├─────────┤       │◄────────────────►│   │ Omnitik ├──┘ │
│      ├────┤ LAP-120 │       │                  │   └─────────┘    │
│      │    └─────────┘       │                  │          Node    │
│      │                      │                  └──────────────────┘
│  ┌───┴─────┐                │
│  │ Omnitik │                │
│  └───┬───┬─┘                │
│      │   │                  │                  ┌─────────────┐
│      │   │                  │                  │             │
│      │   │   ┌──────────┐   │   60GHz PTP      │             │
│      │   └───┤ Gigabeam │   │◄────────────────►│             │
│      │       └──────────┘   │   Backhaul       │             │
│      │                      │                  │             │
│      │                      │                  │ Other Hubs  │
│      │              Rooftop │                  └─────────────┘
└──────┼──────────────────────┘
       │
       │
       │
       │
       │
       │
       │
       │
       │ ethernet + poe
       │
       │
       ▼
   To Indoor Router
```

Note that the Omnitik has 5 ethernet ports, allowing for a 360 degree sector coverage via 3x sectors, an uplink, meshing, and an access point, all in a tidy package that can be mounted on a single pole.

## Custom Hubs

Custom hubs can be any shape and size. For example, a small Hub consisting of an 1x Omnitik, 1x LiteBeam, and only 1x LAP-120 is completely valid, and a great way to deploy a lower cost hub, with an eye towards increasing capacity later as necessary.

We will post diagrams of more example hub topologies soon - check back later!
