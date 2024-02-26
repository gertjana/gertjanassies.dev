---
title: Rust on ESP32 part 3 - MQTT and OCPP
author: Gertjan Assies
date: "2024-02-26"
category: code, make
tags: rust, embedded, esp32, featured, ocpp, mqtt
published: false
image: "/images/rusty_charger.webp"
summary: "Communicating with a backend using MQTT and OCPP"
---

<script lang="ts">
    import { Lightbox } from 'svelte-lightbox';
</script>


## references
* Code: https://github.com/gertjana/charger_rust_esp32_c3/tree/cad15fb3a088cdd82d7dbfd5f9d16512b37e4d6f
* esp-idf-template: https://github.com/esp-rs/esp-idf-template
* M5 Stamp ESP32-C3U: https://docs.m5stack.com/en/core/stamp_c3u
* The embedded rust book:  https://docs.rust-embedded.org/book/
* Espresiff ESP-32: https://www.espressif.com/en/products/socs/esp32


