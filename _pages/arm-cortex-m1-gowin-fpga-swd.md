---
permalink: /arm-cortex-m1-gowin-fpga-swd/
title: "ARM Cortex M1 Gowin FPGA SWD"
excerpt: "A tutorial on debugging the ARM Cortex M1 on Gowin FPGAs."
author_profile: true
---

This tutorial explains how to debug the ARM Cortex M1 MCU instantiated in a Gowin FPGA using Serial Wire Debug (SWD) with a Blackmagic Probe (BMP).

## Blackmagic Probe Setup

This tutorial assumes you are using a Blackmagic Probe (BMP) with the `akiel/cortex-m1` branch of the [blackmagic project](https://github.com/akielaries/blackmagic/tree/akiel/cortex-m1).

### Building the Blackmagic Project

To build the Blackmagic project for loading onto the BMP, use the following commands:

```bash
meson setup build --cross-file=cross-file/native.ini -Dtargets=cortexm,stm -Ddebug_output=true
```

### Loading Firmware onto the BMP

Load the built firmware onto your Blackmagic Probe using `dfu-util`:

```bash
sudo dfu-util -d 1d50:6018,:6017 -s 0x08002000:leave -D blackmagic_native_firmware.bin
```

### Identifying the BMP Device

After loading the firmware, connect your BMP. You can identify the `/dev` device it pops up as by checking your kernel messages:

```bash
sudo dmesg | grep tty
```

Look for a `ttyACM` or similar device.

### Debugging with GDB-Multiarch

Once the BMP is connected and identified, you can start a debugging session using `gdb-multiarch`.

1.  **Launch GDB-Multiarch:**
    ```bash
    gdb-multiarch <path_to_your_binary.elf>
    ```

2.  **Connect to the BMP:**
    Inside GDB, connect to the Blackmagic Probe:
    ```gdb
    target extended-remote /dev/ttyACM0 # Replace /dev/ttyACM0 with your BMP's device path
    ```

3.  **Scan for SWD Devices:**
    Scan for all SWD devices on the chain:
    ```gdb
    monitor swdp_scan
    ```

4.  **Attach to M1 Core:**
    Attach to the detected M1 core (replace `<number>` with the appropriate device number):
    ```gdb
    attach <number>
    ```

5.  **Load and Continue:**
    Load your ELF file and continue execution:
    ```gdb
    load
    continue
    ```