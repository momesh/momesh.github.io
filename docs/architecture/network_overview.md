---
title: Network Overview
parent: Architecture
grand_parent: Docs
---

# Network Overview

MOMesh network architecture is intentionally similar to NYC Mesh (you can read more about that [here](https://docs.nycmesh.net/networking/10-69-net-network/)). Use what works :)

We use a combination of PTP, PTMP, and OSPF meshing to create our network.

## Mesh Network (`10-69-net` or 10.69.0.0/16)

Each mesh router gets an IP from here. Each router in the mesh will advertise a `/32` route to `224.0.0.5` (OSFP multicast).

### Router IP Addresses

Node `0123` implies router IP `10.69.1.23`, where `1234` has `10.69.12.34`. This was [taken straight from idea 3 here](https://docs.nycmesh.net/networking/ipmappingidea/), but can be adjusted as needed.

| nn | first router | second router |
| --- | --- | --- |
| 0000 | 10.69.0.0 | 10.69.0.100 |
| 0123 | 10.69.1.23 | 10.69.1.123 |

## Internal Network (10.96.0.0/26)

A `/26` (64 IPs) is statically allocated in each router (in our default configurations), used to distribute DHCP IPs to devices behind a node (i.e. your home router).

You can compute your internal network CIDR from a node number like so:

<script>
/* TODO: put this logic into JS and embed a simple converter straight into the docs
</script>

```ruby
require 'ipaddr'
ARGV.each do |arg|
  n = arg.to_i
  net_s = "10.#{ 96 + (n >> 10) }.#{ (n >> 2) & 255 }.#{ ((n & 3) <<6) }/26"
  addrs = IPAddr.new(net_s).to_range
  puts "Net: #{net_s}\nAddresses: #{addrs.count}\nLast IP: #{addrs.last}"
end

# Invocation: ./net_for_node 123
# Result:
# Net: 10.96.30.192/26
# Addresses: 64
# Last IP: 10.96.30.255
```

## OSPF

We use OSPF for meshing between [omnitiks](/equipment/mikrotik/omnitik).

1. General
    1. All OSPF usage will be on area `0.0.0.0` ( backbone area )
    2. Set Router ID to the 10-69-net address of the Node
    3. All OSPF timers will be set to ( this is typically default ):
        - Link Cost 10
        - Retransmit Interval 5
        - Transmit Delay 1
        - Hello Interval 10
        - Dead Router Interval 40
2. Interfaces should be in PtMP mode (not broadcast)
3. OSPF “networks” should only be the 10-69-net, unless there is a special case
4. Redistribute Default Route should be `never`, unless you are distributing a default route
    1. If you are redistributing a default route, do so `as type 1`
    2. Check with the rest of the network what the correct metric should be
5. Redistribute user networks via Redistribute Connected `as type 1`
6. Mikrotik Only: Filter VPN point-to-point /32 links. They cause trouble.
7. Do not also run BGP, unless there is a special case; take care of metrics in this case.

Also, see the [nycmesh docs on OSPF](https://docs.nycmesh.net/networking/ospf/), which are very useful (our config is based on theirs).
