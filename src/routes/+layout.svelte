<script lang="ts">
    import Nav from '$src/components/Nav.svelte';
    import Footer from '$src/components/Footer.svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    // import { theme } from '$app/stores';

  </script>
  
  <svelte:head>
    <title>gertjan.assies.dev</title> 
    <!-- <meta name="color-scheme" content={$theme == 'system' ? 'light dark' : $theme}> -->
    <!-- <link rel="stylesheet" href={`/theme/${$theme}.css`} /> -->
  </svelte:head>
  
  <Nav />
  
  <div class="content">
    <main in:fade>
      <slot />
    </main>
  </div>
  
  <Footer />

  <style lang="scss">
    @import "$src/styles/prism-one-light.css";
    @import "$src/styles/color-palette.scss";
    @import "$src/styles/media-queries.scss";
    @import "$src/styles/typography.scss";
  
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

    div.content {
      border-left: 1px solid var(--accent);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 1em;
      padding-left: 1em;
      padding-top: 2em;
      max-width: 90%;
    }

    :global(div.content h1, div.content h2, div.content h3) {
      font-family: RedHatText;
      font-weight: 400;
      margin: 0;
      border-bottom: 1px solid var(--accent);
      width: 73%;
    }
  </style>