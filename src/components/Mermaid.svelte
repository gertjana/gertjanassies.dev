<script>
  import { mermaidRendered } from "$lib/stores";

  /** height of the rendered formula */
  export let height = 400;
</script>

<div class="container" style:height= { $mermaidRendered ? null : `${height}px`}>
  {#if $mermaidRendered}
  <pre class="mermaid" style:height={ `${height}px` }>
    <slot />
  </pre>
  {:else}
  <div class="placeholder" style:height={ `${height}px` }>
    ...
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