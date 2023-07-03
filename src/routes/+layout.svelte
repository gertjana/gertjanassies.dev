<script lang="ts">
    import Nav from '$src/components/Nav.svelte';
    import Footer from '$src/components/Footer.svelte';
    import { fade } from 'svelte/transition';

  </script>
  
  <svelte:head>
    <title>gertjan.assies.dev</title> 
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
    }
  </style>