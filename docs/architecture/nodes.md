---
title: Nodes
parent: Architecture
grand_parent: Docs
nav_order: 1
---

# Nodes

A Node is a participant in our mesh network. A (typical) node consists of the following routers:

- 1x [LiteBeam 5AC Gen2](/equipment/lbe): Router to connect with nearby [hubs](./hubs)
- 1x [Omnitik](/equipment/omnitik): Meshes with nearby Omnitiks, serves as access point and power distribution to other devices

These devices are powered by a single ethernet cable running from inside, up to the routers on the roof. An power-over-ethernet injector is plugged into your mains outlet indoors to provide power to the roof. Your home wifi is then plugged into the ethernet.

People nearby can connect to the internet with the `-MOMesh Community Wifi-` SSID being broadcast. Additionally, nearby Omnitiks will automatically mesh together, providing additional resilience to link failures (typically meshing is effective at few hundred meters range - beyond that, use PTP).

Please note: the rooftop radios must be given a clear line of sight to the other hub - the wireless frequencies (5GHz and 60GHz) are disrupted by tree branches, leaves, etc.

## Diagram

This is a typical layout of a node:


```
  ┌────────────────┐           ┌───────────────┐
  │                │           │               │
  │ Nearby Nodes   │           │ Nearby Hubs   │
  │                │           │               │
  └────────────────┘           └───────────────┘
           ▲                           ▲
           │                           │
           │                           │
           │ Wifi Meshing              │ Wifi
           │                           │
┌──────────┼───────────────────────────┼─────────────┐
│ Rooftop  │                           │             │
│          │                           │             │
│          ▼                           ▼             │
│ ┌───────────────────┐      ┌─────────────────────┐ │
│ │                   │      │                     │ │
│ │  Omnitik Mesh AP  │      │ LiteBeam 5AC Router │ │
│ │                   │      │                     │ │
│ └───┬───────────┬───┘      └──────────────┬──────┘ │
│     │           │                         │        │
│     │           │       ethernet          │        │
│     │           └─────────────────────────┘        │
│     │                                              │
└─────┼──────────────────────────────────────────────┘
      │
      │
      │
      │ ethernet
      │
      │
      │
      │
   ┌──┼──────────────────────────────────────────────┐
   │  │                                              │
   │  │  poe out  ┌────────────────────┐             │
   │  └───────────┤                    │             │
   │              │   Power Injector   │             │
   │         ┌────┤                    │             │
   │         │    └────────────────────┘             │
   │         │                                       │
   │         │ ethernet                              │
   │         │                                       │
   │         │    ┌──────────────────────┐           │
   │         └────┤                      │           │
   │              │  Home Indoor Router  │           │
   │              │                      │           │
   │              └──────────────────────┘           │
   │                      ▲                          │
   │                      │                          │
   │            wifi      │    ethernet              │
   │       ┌──────────────┼───────────────┐          │
   │       ▼              │               ▼          │
   │  ┌────────┐          ▼           ┌───────────┐  │
   │  │        │    ┌─────────┐       │           │  │
   │  │ Laptop │    │         │       │ Computer  │  │
   │  │        │    │  Phone  │       │           │  │
   │  └────────┘    │         │       └───────────┘  │
   │                └─────────┘                      │
   │  Indoors                                        │
   └─────────────────────────────────────────────────┘

```
