import { defineMDSveXConfig as defineConfig } from "mdsvex";
import relativeImages from "mdsvex-relative-images";
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math'

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [relativeImages, remarkMath],
  rehypePlugins: [rehypeKatexSvelte],
});


export default config;
