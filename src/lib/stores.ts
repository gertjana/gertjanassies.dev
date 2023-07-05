import { writable } from "svelte/store";

export const theme = writable("system");
export const mermaidRendered = writable(false)
