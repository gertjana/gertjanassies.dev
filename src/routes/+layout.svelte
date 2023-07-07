<script lang="ts">
  import Nav from '$src/components/Nav.svelte';
  import Footer from '$src/components/Footer.svelte';
  import { fade } from 'svelte/transition';

  import { theme } from '$lib/stores.ts';
</script>
  
  <svelte:head>
    <title>gertjanassies.dev</title> 
    <meta name="description" content="Gertjan Assies personal blog" />
    <meta name="keywords" content="Gertjan Assies, blog, personal, code, make, technology, programming, maker, 3dprint" />
    <meta name="author" content="Gertjan Assies" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="gertjanassies.dev" />
    <meta property="og:description" content="Gertjan Assies personal blog" />
    <meta property="og:image" content="https://gertjanassies.dev/logo_ga.svg" />
    <meta property="og:url" content="https://gertjanassies.dev" />
    <meta name="robots" content="index, follow, archive" />

    <meta name="color-scheme" content={$theme == 'system' ? 'light dark' : $theme}/> 
  </svelte:head>
  

  <Nav />
  
  <div class="content">
    <main in:fade>
      <slot />
    </main>
  </div>
  
  <Footer />

  <style lang="scss">
    @import "$src/styles/prism-one-dark.css" (prefers-color-scheme: dark);
    @import "$src/styles/prism-one-light.css" (prefers-color-scheme: light);
    @import "$src/styles/color-palette.css"; 
    @import "$src/styles/typography.css";
  
    :global(html) {
      scroll-behavior: smooth;
      font-family: FiraCode, monospace;
    }

    :global(a) {
      color: var(--links);
      text-decoration: none;
    }
    :global(::selection) {
      background-color: var(--accent);
      color: var(--background);
    }

    :global(blockquote) {
      border-left: 2px solid var(--accent-2);
      padding-left: 1em;
      margin-left: 1em;
    }

    :global(table) {
      border-spacing: 0;
      border-collapse: collapse;
      border-bottom: 1px solid var(--accent-4);
    }
    :global(th) {
      border-left: 1px solid var(--accent-4);
      padding-left: 0.5em;
      padding-right: 0.5em;
      margin: 0em;
      background-color: var(--accent-4);
    }
    :global(td) {
      border-left: 1px solid var(--accent-4);
      padding-left: 0.5em;
      padding-right: 0.5em;
      margin: 0em;
    }

    :global(td:last-child, th:last-child) {
      border-right: 1px solid var(--accent-4);
    }

    :global(p code, li code) {
      font-size: 1.4em;
      color: var(--accent);
    }

    :global(select) {
      color: var(--links);
      font-family: FiraCode, monospace;
      font-size: 1em;
      border: 0;
    }
    div.content {
      border-left: 1px solid var(--accent);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 1em;
      padding-left: 1em;
      padding-top: 2em;
    }

    :global(div.content h1, div.content h2, div.content h3) {
      font-family: RedHatText;
      font-weight: 400;
      // margin: 0;
      margin-top: 1em;
    }

    :global(span.katex-html) {
    visibility: hidden;
    }
    :global(math) {
      font-size: 1.5em;
    }
  </style>f