import { defineMDSveXConfig as defineConfig } from "mdsvex";
import relativeImages from "mdsvex-relative-images";
import Prism from "prismjs";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [relativeImages],
  rehypePlugins: [],
});


export default config;

// mdsvex.config.js

