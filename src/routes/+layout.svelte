<script lang="ts">
    import Nav from '$src/components/Nav.svelte';
    import Footer from '$src/components/Footer.svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';

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
  
  <!-- <Footer /> -->

  <style lang="scss">
    @import "$src/styles/prism-one-light.css";
    @import "$src/styles/color-palette.scss";
    @import "$src/styles/media-queries.scss";
    @import "$src/styles/typography.scss";
    @import "$src/styles/dimensions.scss";
  
    :global(html) {
      scroll-behavior: smooth;
      font-family: FiraCode, monospace;
    }
    :global(::selection) {
      background-color: var(--accent);
      color: var(--background);
    }

    div.content {
      border-left: 1px solid var(--accent);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 1em;
      padding-left: 1em;
      max-width: 75%;
    }

    :global(div.content h1, div.content h2, div.content h3) {
      font-family: RedHatText;
      font-weight: 400;
      margin: 0;
    }
  </style>