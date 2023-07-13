import { writable } from "svelte/store";
import { browser } from '$app/environment'

export const mermaidRendered = writable(false)

export const theme = writable("system")
