---
title: Rust on ESP32 part 2 - The hardware
author: Gertjan Assies
date: "2024-01-25"
category: code, make
tags: rust, embedded, esp32, featured
published: true
image: "/images/rusty_charger.webp"
summary: "Focusing on the minimal hardware needed to build an EV Charger with Rust on a ESP32"
---

<script lang="ts">
    import { Lightbox } from 'svelte-lightbox';
</script>

The previous [article](/blog/240101_rust_on_esp32) was about try-ing to get Rust running on a esp32 microcontroller.

Now a smaller blog that speaks a bit about the hardware.

In there I started to set it up as a charger for an Electric Vehicle, lets dive in to that by desiging the hardware

A simple as possible charger should:

 * Have a way to detect whether a cable is inserted or not (or simulated by a switch)
 * be able to lock the cable with a solenoid (or simulated by a led)
 * Allow swiping a card to start charging (or simulated with a button)
 * Have a relay to apply power to the cable
 * Have a multicolor led to display the state of the charger (the M5 Stamp has a multicolor led onboard)

Putting all this into a schematic it looks something like this

## Schematic
![Schematic](/images/schematic.png)

## State Machine

The stages a Charger goes through (Available, Occupied, Charging, Error) so creating a smell FSM (Finite State Machine) looks like good way to model this.

Whenever something happens (an InputEvent), a cable gets inserted/removed or some form of authentication is provided, a transision is made from one state to the next, resulting in an output event, for instance to tell the charger to lock the cable and start charging whenever the charged is in a Occupied state.

![FSM](/images/charger_eps32_state_diagram.png)

Every Arrow is a `transition` call with the current `State` and an `InputEvent` to a new `State` with an `OutputEvent`.

code wise that will look like this:

```rust
impl Charger {
    pub fn transition(&mut self, input: ChargerInput) -> Result<(State, Option<ChargerOutput>, Error) {
        let output = match (input, self.state.clone()) {
            (ChargerInput::PlugIn, State::Available) => {
                self.set_state(State::Occupied);
                Some(ChargerOutput::Unlocked)
            }
            (ChargerInput::PlugOut, State::Occupied) => {
                self.set_state(State::Available);
                Some(ChargerOutput::Unlocked)
            }
            (ChargerInput::Swipe, State::Occupied) => {
                self.set_state(State::Charging);
                Some(ChargerOutput::LockedAndPowerIsOn)
            }
            (ChargerInput::Swipe, State::Charging) => {
                self.set_state(State::Occupied);
                Some(ChargerOutput::Unlocked)
            }
            _ => {
                Err("An invalid transistion occurred")
            }
        }
       Ok((self.get_state(), output))
    }
```
So now all it left is a bit of logic to do the transitions whenever an event happens

```rust
    // setup is skipped, see previous blog, or code

    button.enable_interrupt().unwrap();
    notification.wait(esp_idf_svc::hal::delay::BLOCK);

    match charger.transition(charger::ChargerInput::Swipe) {
        Ok((ChargerState::Charging, charger::ChargerOutput::LockedAndPowerIsOn)) => {
            relay.set_high().unwrap();
            solenoid.set_high().unwrap();
        }
        Ok((_, charger::ChargerOutput::Unlocked)) => {
            relay.set_low().unwrap();
            solenoid.set_low().unwrap();
        }
        ...
    }
```

<Lightbox><img alt="Application Model" src="/images/pullupresistor.png" style="float:right;margin-left:20px;" /></Lightbox>

The GPIO Port the button is connected to, is configured as input with an pull-up resistor with the button connected to ground, meaning whenever the button is pressed, it will set the input to 0 and when released the pull-up resistor will 'pull' it to 1 again (creating a Positive Edge (0 -> 1) event)

As we have configured the button in the code to subscribe to a positive edge event, the code will unblock whenever the button is released

We then call the transition function with the current state and the input event `Swipe` which will give us a new state `Chargng` and a output `LockedAndPowerIsOn`, we then set the hardware to whatever the output is telling us.


So that's the hardware done, the next article will focus on Sending and retrieving OCPP Messages to a backend by configuring the Wifi and MQTT Publisher and Subscriber



