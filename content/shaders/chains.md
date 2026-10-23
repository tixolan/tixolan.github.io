---
title: "Chains"
date: 2026-10-23
thumbnail: "images/thumbnails/chains_thumb.png"
description: "Chains in various directions surrounded by light"
tags: ["Material Maker"]
---

![Chains](/images/chains/chains.png)

I Haven't uploaded a shader art in a while and I felt like giving a bit of context into this one. I originally planned on doing a background
using randomly rotated cubes as I did for [Cubes Cubes](https://tixo.pt/shaders/cubes_cubes/). However, since I was on my laptop, with a weaker
GPU, I ended up settling for a plane with no surface as the background. I needed this since, despite everything, the chains still have light
around them.

As for the chains themselves, it consists of two separate links, each of which is repeated in the Y axis. Afterwards, the chain is infinitely
repeated in the X axis only to be rotated afterwards. This had to be done in this order or the Chains would end up cutting off.

![Chain Blocks](/images/chains/chains_chain_mm.png)

I originally intended to have them just be made of light and emit it. However, I felt like something was missing and decided to try for a tron-ish
aesthetic by replicating the chain and flattening the original link as well as expanding the major radius.

|[Chain Light Blocks](/images/chains/chains_light_mm.png)

As with all my shaders, I owe it to [Paulo Falcão's MaterialMakerRayMarching](https://github.com/paulofalcao/MaterialMakerRayMarching) library.
