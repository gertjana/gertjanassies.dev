import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  kit: {
    adapter: adapter(),
    alias: {
      "$src/*": "src/*",
    },
  },

  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({ typescript: true, scss: true}),
  ]
};

export default config;
