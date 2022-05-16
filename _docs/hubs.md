---
title: Hubs
layout: docs
parent: Documentation
---

# Hubs

A Hub is a [node](./nodes) on steroids, with additional radios for further distribution of the mesh.

## Small Hub

Typically, a small hub looks like a regular node, with some sectors added, and maybe a bigger PTP router:

- 1x [Omnitik](/equipment/omnitik): meshes with nearby omnitiks, serves as access point and power distribution.
- 3x [LAP-120](/equipment/lap120): 120 degree sectors to provide access to other nodes
- 1x [Gigabeam](/equipment/gbep): A higher speed PTP to another hub for uplink (typically replaces/augments a Litebeam)

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
