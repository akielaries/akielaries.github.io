---
permalink: /
title: "My Notebook"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a Flight Software Engineer at Planet Labs working on payload firmware and hardware for electro-optical and hyperspectral satellites. I obtained my Bachelor's degree in Computer Science from 
Northern Arizona University in 2023. Since, I have been doing post-graduate courseworkse in Electrical Engineering at the University of Colorado Boulder mostly in Computer Engineering and power
electronics.

I have interest, experience, coursework, and open-source contributions in various areas
such as low-voltage electronics, embedded & distributed systems, MCUs, circuit design, 
wireless sensor networks, network simulation & containerization, FPGA design, compilers & 
code generation, computational mathematics, high performance & scientific computing and much more.
I often spend my free time working on some projects related to the above.


# Some projects...
  * [signalmesh](https://github.com/akielaries/signalmesh) - Digital synthesizer board
  comprised of a network of microcprocessors and a central FPGA. An open source hardware
  and firmware project.

  * [openGPMP](https://github.com/akielaries/openGPMP) - Open source, general purpose,
  multithreaded capable mathematics package written in C++, C, Fortran, and Assembly
  covering topics such as linear algebra, machine learning, number theory and more. I don't
  work on it much these days but is an interesting and semi-applicable project.

  * [libinfluxdb](https://github.com/akielaries/libinfluxdb) - HTTP-base C API for InfluxDB.
  Contains a simple set of functions that could probably be fixed up more.

  * [sysd](https://github.com/akielaries/sysd) - This is a simple system daemon
  for monitoring the single board devices (BeagleBones RPis, Jetsons, etc.) in my home lab.
  There is a central host that has an instance of InfluxDB running with a daemon listening for
  defined telemetry packets from a given client. Using the [libinfluxdb](https://github.com/akielaries/libinfluxdb)
  InfluxDB C API I put together, the decoded telemetry packets are injected into a database and
  and viewable via queries.

  * [rng_piHAT](https://github.com/akielaries/rng_piHAT) - A Raspberry Pi HAT (Hardware Attached on Top)
  featuring different random noise generator circuits available over the Pi's GPIO bank. This is project is
  in its very early stages but close to coming together. There is an STM32F103 chip in the mix as well.

  * [rack_piHAT](https://github.com/akielaries/rack_piHAT) - Another Raspberry Pi HAT (Hardware Attached on Top)
  I put together that has a few climate sensors routed to an STM32F103 Blue Pill board. This is also in a semi-done
  state.

  * [dist-fs](https://github.com/akielaries/dist-fs) - A sort distributed file system/file
  system replacing my need for dropbox. This is an ongoing effort at the moment and a group
  project attempt. At a high level, this enables file upload to arbitrary drives under `/dev`
  on Linux based devices. Right now operates as a command line interface on the host machine
  connected to a the storage device but is capable of running in a client/server state.

  * [benchmarks](https://github.com/NAU-IoT/benchmarks) - Using C++ and CUDA, benchmarked
  performance of NAU IoT & DiscoverCCRI's NVIDIA Jetson Nanos and Raspberry Pi Compute
  Module IO Boards. Implemented primality test & generation, matrix arithmetic, Fibonacci
  sequence calculations, Monte Carlo methods, and Fast Fourier Transform methods. I never got
  to finish this before I left the lab but was an interesting effort to compare the hardware used
  in different single board computers.

  * [i2cscan](https://github.com/akielaries/i2cscan) - A simple I2C utility scanning for
  available I2C busses and addresses similar to i2cdetect from linux's
  [i2c-tools](https://git.kernel.org/pub/scm/utils/i2c-tools/i2c-tools.git/).
