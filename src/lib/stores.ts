import { writable, get } from "svelte/store";

export const mermaidRendered = writable(false)

export const theme = writable("system")