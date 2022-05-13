---
title: Frequently Asked Questions
parent: Home
nav_order: 2
---

## Frequently Asked Questions

### About MOMesh

-   [Why is MOMesh building a community network?](#why)
-   [How does it work?](#how)
-   [Is the Mesh secure?](#security)
-   [What is your user data policy?](#data)

### Joining the Community

-   [How do I sign up?](#signup)
-   [Is there a cost to join?](#cost)
-   [I heard that MOMesh is free Internet. Is that true?](#free)
-   [What are my obligations as a MOMesh community member?](#obligations)
-   [How can I volunteer? What if I don’t know anything about networking?](#volunteer)
-   [What if I already have Starlink, or want to keep my existing provider as backup?](#dualwan)
-   [Will joining the Mesh mean other mesh users will use my Starlink connection?](#connectionsharing)


### Getting Connected to the mesh

-   [How can I tell if I’m in the coverage zone for MOMesh?](#covered)
-   [What is involved in a typical installation?](#typicalinstall)
-   [What will the hardware setup look like?](#hardwaresetup)


## About MOMesh

### <a name="why"></a>Why is MOMesh building a community network?

Below are just a few of the reasons to join and support MOMesh:

-   We are building an infrastructure commons that is accessible to everyone
-   We are a neutral network that does not block or discriminate content or throttle data  
-   We do not collect personal data  
-   We’re committed to bridging the Digital Divide by connecting underserved communities in Missouri
-   We are building a resilient emergency community network
-   We are decentralized, with no single point of failure as an organization or network  
-   We believe in building community and supporting highly localized websites and services  
-   We offer public wi-fi hotspots across the network 
-   We allow for fast uploads as well as downloads


### <a name="how"></a>How does it work?

Most MOMesh community members (“nodes”) have wireless routers mounted on a rooftop or balcony to connect to other nodes, forming a network. You can see examples of the outdoor routers we use [here](/equipment).

Our network peers (connects) with many other networks at an [Internet exchange point (IXP)](https://en.wikipedia.org/wiki/Internet_exchange_point), providing direct access to the Internet without the intermediary of a commercial Internet Service Provider. MOMesh maintains a number of primary Internet exchange points that we call “Supernodes.”

### <a name="security"></a>Is the Mesh secure?

By default, our mesh router is firewalled from your local network. It is not possible to reach beyond the mesh router to your local access network (LAN).

The mesh internet connection to your dwelling is secure using standard WPA2 encryption. Traffic between nodes on the mesh is also encrypted using WPA2. We also support VPN connections for an additional layer of security.

When connecting through the mesh from the street (i.e. with `-MOMesh Community Internet-` SSID) you should use the same standard precautions as you would when connecting to WiFi at a coffee shop or airport: use [https](https://en.wikipedia.org/wiki/HTTPS) (lock icon) web sites for secure connections (most browsers do this by default nowadays), or use a VPN service.

### <a name="data"></a>What is your user data policy?

See our [Privacy Policy](/privacy-policy).


## Joining the Community

### <a name="signup"></a>How do I sign up?

After reading through the FAQs, fill out the [join form](/join). If you would like to volunteer with MOMesh, please mention so!

### <a name="cost"></a>Is there a cost to join?

MOMesh believes that the Internet is for everyone. By operating as a volunteer run organization, we keep costs as low as possible.

- Average equipment cost: **~$240** (see [equipment](/equipment) for details)
- Average installation costs: **$50** (including mounting gear, hardware, cable, etc)

Once connected, if you can afford it, we also recommend that you set up a [recurring monthly donation](/donate) of $20, $30, $50, or even $60. We rely on these donations to maintain and expand our network. We are all volunteers to 100% of these contributions go to building and maintaining the network.

If the above suggested donations are too much for you to afford, we can get you connected all the same, just reach out! Internet is a human right.

### <a name="free"></a>I heard that MOMesh was free Internet. Is that true?

We believe EVERYONE should be able to connect online. That said, the [wireless equipment](/equipment) we use to connect you and your neighbors does cost money. We ask those who can afford it to [donate](/donate) a reasonable amount monthly, or to volunteer by helping connect your neighbors, or both!

### <a name="obligations"></a>What are my obligations as a MOMesh community member?

By joining the Mesh you are obliged to share and extend the Mesh in the same way that it was shared with you (details: [Network Commons License](./network-commons-license)).

At a minimum, this requires providing power to your rooftop router so that other members can connect to it. (It uses less power in a whole day than it takes to lightly toast a slice of bread). We may also request access to your rooftop after the initial installation in order to upgrade the rooftop router infrastructure. You are not obligated to pay a monthly fee although we suggest a recurring donation if you can afford it to help keep the network running and growing.

### <a name="volunteer"></a>How can I volunteer? What if I don't know anything about networking?

We need your help! You do not need to know networking to help out! Please [reach out](/join) if you are interested in contributing to build our network.

### <a name="dualwan"></a>What if I already have Starlink, or want to keep my existing provider as backup?

Joining the Mesh is a great compliment to an existing internet connection!

If you already have an internet connection, you can use Mesh as your backup connection by using a "Dual WAN" capable indoor router (todo: good low-cost recommendation, like Ubiquiti ER-X?). Your indoor router will automatically detect and failover between the Mesh and your other provider.

### <a name="connectionsharing"></a>Will joining the Mesh mean other mesh users will use my Starlink connection?

No.

Your private starlink/DSL/satellite internet you may have is firewalled from the mesh. We do not send any traffic out of your personal internet provider. 

## Getting Connected to the mesh

### <a name="covered"></a>How can I tell if I’m in the coverage zone for MOMesh?

Line-of-sight to a MOMesh hub, or nearby node, is required to join the mesh. See whether you can use binoculars to see a nearby hub - if yes, theres a great chance you can be connected!

You can view our [full map here](/map).

### <a name="typicalinstall"></a>What is involved in a typical installation?

For a volunteer-led install, MOMesh will send a team of volunteers to your building to conduct a site survey. If we can connect to an existing node from your rooftop or property, we will install all the necessary hardware to get you connected to the Mesh.

Typically, installs can be completed in an afternoon, but in certain cases they can take longer. We also invite you to participate in the install so that you can learn about how your new Internet connection works.

Most installations proceed in the following order:

- Survey the apartment and rooftop
- Decide where ethernet cable should enter the dwelling
- Test signal strength to confirm connection is possible
- Install mounting hardware and align router
- Run cable into dwelling
- Set up indoor WiFi router
- Speed test
- Clean up

In case of bad weather conditions, we will notify you that the install has been canceled and will invite you to make a new appointment.

### <a name="hardwaresetup"></a>What will the hardware setup look like?

This greatly depends on what hubs you have line-of-sight visibility to, and what types of radios the hub has. A node will have 1-3 rooftop outdoor wifi routers, mounted on a J pipe or similar mast, with an unobstructed view of the hub you intend to connect to.

The rooftop routers are powered by a power injector, sending power over the ethernet cable up to your roof.

You can take a closer look at the [wireless equipment](/equipment) we use to build the network.


