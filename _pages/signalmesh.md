---
permalink: /signalmesh/
title: "signalmesh"
excerpt: "A digital synthesizer board built from a network of microprocessors and a central FPGA. An open source hardware and firmware project."
author_profile: true
---

signalmesh is a digital synthesizer board comprised of a network of
microprocessors and a central FPGA. It is an open source hardware and firmware
project spanning board design, embedded firmware, and FPGA gateware.

## Repositories

* [signalmesh](https://github.com/akielaries/signalmesh){:target="\_blank"} - firmware and FPGA sources
* [signalmesh_CAD](https://github.com/akielaries/signalmesh_CAD){:target="\_blank"} - hardware, schematics, and board CAD

## Architecture

TODO: describe the microprocessor network and how the nodes coordinate with the
central FPGA, including the signal path and any bus/interconnect used between them.

## Hardware

Board overview, key components, and CAD/schematics. Sources live in
[signalmesh_CAD](https://github.com/akielaries/signalmesh_CAD){:target="\_blank"}.

### Oscillator Controller (OSC_CTRL)

TODO: fill in details.

<figure class="half">
  <img src="{{ base_path }}/images/signalmesh/OSC_CTRL_3d_top.png" alt="Oscillator Controller board, top render">
  <img src="{{ base_path }}/images/signalmesh/OSC_CTRL_3d_bottom.png" alt="Oscillator Controller board, bottom render">
  <figcaption>OSC_CTRL, top and bottom.</figcaption>
</figure>

### Audio Peripheral Module (APM v5 r1)

TODO: fill in details. STM32H755 based.

<figure class="half">
  <img src="{{ base_path }}/images/signalmesh/APM_v5_r1_3d_top.png" alt="APM v5 r1 board, top render">
  <img src="{{ base_path }}/images/signalmesh/APM_v5_r1_3d_bottom.png" alt="APM v5 r1 board, bottom render">
  <figcaption>APM v5 r1, top and bottom.</figcaption>
</figure>

### Audio Creation Module (ACM v1 r1)

TODO: fill in details. GW2AR-18 FPGA based.

<figure class="half">
  <img src="{{ base_path }}/images/signalmesh/ACM_v1_r1_3d_top.png" alt="ACM v1 r1 board, top render">
  <img src="{{ base_path }}/images/signalmesh/ACM_v1_r1_3d_bottom.png" alt="ACM v1 r1 board, bottom render">
  <figcaption>ACM v1 r1, top and bottom.</figcaption>
</figure>

## Firmware

TODO: what runs on the microprocessors, toolchain, and how the firmware is built
and flashed.

## FPGA

TODO: what the central FPGA handles, the target part, and the gateware toolchain.
