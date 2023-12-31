<script lang="ts">
  import Nav from '$src/components/Nav.svelte';
  import Footer from '$src/components/Footer.svelte';
  import { fade } from 'svelte/transition';
  import { dev } from '$app/environment';

  import { theme } from '$lib/stores.ts';

  import type { PageData } from './$types';
  
  export let data: PageData;

  let title: string = "gertjanassies.dev";
  title += data.tag ? ` - tag:${data.tag}` : "";
  title += data.category ? ` - category:${data.category}` : "";

</script>
  
  <svelte:head>

    {#if dev}
      <title>DEV {title}</title> 
    {:else}
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-7T2NS9G924"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'G-7T2NS9G924');
      </script>    

      <title>{title}</title> 
    {/if}
    
    <meta name="description" content="Gertjan Assies personal blog, articles, about coding and the maker space, sometimes other things that interest me." />
    <meta name="keywords" content="Gertjan Assies, blog, personal, code, make, technology, programming, maker, 3dprint" />
    <meta name="author" content="Gertjan Assies" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="gertjanassies.dev" />
    <meta property="og:description" content="Gertjan Assies personal blog" />
    <meta property="og:image" content="https://gertjanassies.dev/logo_ga.svg" />
    <meta property="og:url" content="https://gertjanassies.dev" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@major7" />
    <meta name="robots" content="index, follow, archive" />

    <meta name="color-scheme" content={$theme == 'system' ? 'light dark' : $theme}/> 
  </svelte:head>
  
  <Nav />
  
  <div class="content">
    <main in:fade|global>
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
      color: #000;
    }
    :global(td) {
      border-left: 1px solid var(--accent-4);
      padding-left: 0.5em;
      padding-right: 0.5em;
      margin: 0em;
    }

    :global(tr:nth-child(2n)) {
      background-color:var(--odd);
      color: var(--even);
    }

    :global(td:last-child, th:last-child) {
      border-right: 1px solid var(--accent-4);
    }

    :global(pre) {
      position: relative;
      border: 1px solid var(--accent-3);
      max-width: 67%;
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

    :global(div.content h1, div.content h2, div.content h3, div.content h4, div.content h5) {
      font-family: RedHatText;
      font-weight: 600;
      // margin: 0;
      margin-top: 1em;
    }
  </style>