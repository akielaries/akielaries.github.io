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
meson setup build --cross-file=cross-file/native.ini -Dtargets=cortexm,stm -Ddebug_output=true --reconfigure
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
    meson setup build_bluepill --cross-file=cross-file/bluepill.ini -Dtargets=cortexm,stm -Ddebug_output=true
    ```
    Then build it:
    ```bash
    meson compile -C build_bluepill
    ```
    The resulting firmware `.bin` file will typically be found in `build_bluepill/src/firmware.bin` or similar. You might need to check the build output for the exact path.

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

An example `dmesg` output might look like this:
```
[549547.203242] usb 7-1.3.4.3: USB disconnect, device number 34
[549547.433722] usb 7-1.3.4.3: new full-speed USB device number 35 using xhci_hcd
[549547.573144] usb 7-1.3.4.3: New USB device found, idVendor=1d50, idProduct=6018, bcdDevice= 2.00
[549547.573157] usb 7-1.3.4.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[549547.573164] usb 7-1.3.4.3: Product: Black Magic Probe (ST-Link/v2) v2.0.0-323-gf3b99649-dirty
[549547.573169] usb 7-1.3.4.3: Manufacturer: Black Magic Debug
[549547.573173] usb 7-1.3.4.3: SerialNumber: 8A8243AE
[549547.656267] cdc_acm 7-1.3.4.3:1.0: ttyACM1: USB ACM device
[549547.662230] cdc_acm 7-1.3.4.3:1.2: ttyACM2: USB ACM device
```

### Debugging with GDB-Multiarch

Once the BMP is connected and identified, you can start a debugging session using `gdb-multiarch`.

1.  **Launch GDB-Multiarch:**
    ```bash
    gdb-multiarch <path_to_your_binary.elf>
    ```

2.  **Connect to the BMP and Interact:**
    Inside GDB, connect to the Blackmagic Probe and perform the debugging steps. Note the use of `/dev/serial/by-id/` for a persistent device path.

    ```gdb
    (gdb) target extended-remote /dev/serial/by-id/usb-Black_Magic_Debug_Black_Magic_Probe__ST-Link_v2__v2.0.0-323-gf3b99649-dirty_8A8243AE-if00
    Remote debugging using /dev/serial/by-id/usb-Black_Magic_Debug_Black_Magic_Probe__ST-Link_v2__v2.0.0-323-gf3b99649-dirty_8A8243AE-if00
    (gdb) mon swd
    Target voltage: 0.43V
    Available Targets:
    No. Att Driver
     1      Generic Cortex-M1 M1
    (gdb) att 1
    Attaching to program: /home/akiel/GMD_workspace/softcore_fw_example/Debug/softcore_fw_example.elf, Remote target
    ⚠️ warning: while parsing target memory map (at line 1): Required element <memory> is missing
    0x00000844 in UART_SendChar (UARTx=0x50005000, txchar=101 'e') at ../PERIPHERAL/src/GOWIN_M1_uart.c:216
    216	  while(UARTx->STATE & UART_STATE_TXBF);
    (gdb) load
    Loading section .text, size 0x1d0c lma 0x0
    Loading section .ARM.extab, size 0x30 lma 0x1d0c
    Loading section .ARM.exidx, size 0xa0 lma 0x1d3c
    Loading section .data, size 0x158 lma 0x1ddc
    Start address 0x0000051c, load size 7988
    Transfer rate: 83 KB/sec, 726 bytes/write.
    (gdb) c
    Continuing.
    ```

### Debug Trace Output

To enable debug tracing and connect to the debug console:

1.  **Enable Debug Tracing:**
    Use the `blackmagic` utility with your BMP's serial number and verbosity level:
    ```bash
    ./blackmagic -s 8A8243AE -v 32
    ```
    *(Replace `8A8243AE` with your BMP's serial number)*

2.  **Connect to Debug Console:**
    Connect to the debug console using `tio` (or your preferred serial terminal) at 115200 baud:
    ```bash
    tio -b 115200 /dev/serial/by-id/usb-Black_Magic_Debug_Black_Magic_Probe__ST-Link_v2__v2.0.0-323-gf3b99649-dirty_8A8243AE-if02
    ```
    *(Ensure you use the correct `/dev/serial/by-id/` path for your BMP's debug console interface)*
