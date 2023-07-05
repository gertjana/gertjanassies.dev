<script>
    import { fade } from "svelte/transition";
    import Loading from "$src/components/Loading.svelte";
    import { mermaidRendered } from "$lib/stores";
    export let height = 400;
</script>

<div class="container" style:height= { $mermaidRendered ? null : `${height}px`}>
  {#if $mermaidRendered}
  <pre in:fade={{ delay:1000, duration:300 }} class="mermaid" style:height={ `${height}px` }>
    <slot />
  </pre>
  {:else}
  <div out:fade={{ duration:300 }} class="placeholder" style:height={ `${height}px` }>
    <Loading loading={ true } />
  </div>
  {/if}
</div>

<style lang="scss">
  .mermaid {
    display: flex;
  }
  .container {
    display: flex;
    position: relative;
  }
  .placeholder {
    position: absolute;
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>