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

## Building a Low-Cost Blackmagic Probe with STM32F103 'Blue Pill'

If you don't have an official Blackmagic Probe, you can convert a cheap STM32F103 "Blue Pill" development board into one. This allows you to use its onboard SWD pins to load the custom Blackmagic Probe firmware.

### Prerequisites

You will need an existing SWD programmer (e.g., an ST-Link V2 clone, another Blackmagic Probe, or a J-Link) to flash the initial Blackmagic Probe firmware onto the Blue Pill.

### Blackmagic Firmware for Blue Pill

1.  **Clone the Blackmagic Project:**
    Ensure you have the `akiel/cortex-m1` branch of the [blackmagic project](https://github.com/akielaries/blackmagic/tree/akiel/cortex-m1) cloned.

2.  **Build Firmware for STM32F103:**
    Navigate to the `blackmagic` project directory and build the firmware specifically for the `F103RC` (a common chip on Blue Pills) target. This command might vary slightly depending on your `meson` setup:

    ```bash
    meson setup build_bluepill --cross-file=cross-file/native.ini -Dtargets=cortexm,stm32f1 -Dstm32f1=F103RC -Ddebug_output=true
    ```
    Then build it:
    ```bash
    ninja -C build_bluepill
    ```
    The resulting firmware `.bin` file will typically be found in `build_bluepill/src/blackmagic_f103rc_bl.bin` or similar. You might need to check the build output for the exact path.

### Flashing the Blue Pill

Connect your external programmer (e.g., ST-Link) to the STM32F103 Blue Pill's SWD pins:

*   **SWDIO** to **SWDIO**
*   **SWCLK** to **SWCLK**
*   **GND** to **GND**
*   **3.3V** to **3.3V**

Use a tool like `st-flash` (for ST-Link) or `openocd` to flash the generated `blackmagic_f103rc_bl.bin` file.

**Using `st-flash` (assuming ST-Link V2):**

```bash
st-flash write path/to/blackmagic_f103rc_bl.bin 0x8000000
```
*(Note: The flash address `0x8000000` is common for STM32F1 devices. Verify this for your specific Blue Pill variant if you encounter issues.)*

After flashing, the Blue Pill will act as a Blackmagic Probe. You can then connect it to your target (e.g., Gowin FPGA) and follow the "Debugging with GDB-Multiarch" steps above. You might need to disconnect and reconnect the Blue Pill after flashing for it to enumerate correctly as a BMP.

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
    Inside GDB, connect to the Blackmagic probe replacing /dev/ttyACM0 with
    your BMP's device path
    ```gdb
    target extended-remote /dev/ttyACM0
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
