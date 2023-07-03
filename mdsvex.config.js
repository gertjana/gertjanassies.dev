import { defineMDSveXConfig as defineConfig } from "mdsvex";
import relativeImages from "mdsvex-relative-images";
import Prism from "prismjs";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },
  highlight: {
    highlighter: (code, lang) => {
      if (lang && Prism.languages[lang]) {
        const parsed = Prism.highlight(code, Prism.languages[lang]);
        // Look at this thing below
        const escaped = parsed
          .replace(/{/g, '&#123;')
          .replace(/}/g, '&#125;');
        const langTag = 'language-' + lang;
        const codeTag = `<code class=${langTag}>${escaped}</code>`;
        return `<pre class=${langTag}>${codeTag}</pre>`;
      } else {
        const escaped = code.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
        return `<pre><code>${escaped}</code></pre>`;
      }
    },
  },
  remarkPlugins: [relativeImages],
  rehypePlugins: [],
});


export default config;

// mdsvex.config.js

