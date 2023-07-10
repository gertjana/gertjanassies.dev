<script lang="ts">
  export let text :string;

  export let type : string;

  export let path: string;
</script>

{#if type == 'category'}
  <span class="tag category" property="{text}"><a data-sveltekit-reload href="{path}?category={text}">{text}</a></span>
{:else if type == 'tag'}
  <span class="tag" property="{text}"><a data-sveltekit-reload href="{path}?tag={text}">{text}</a></span>
{:else if type == 'warning'}
  <span class="tag warning" property="{text}">{text}</span>
{:else if type == 'info'}
  <span class="tag info" property="{text}">{text}</span>
{:else if type == 'success'}
  <span class="tag success" property="{text}">{text}</span>
{:else if type == 'error'}
  <span class="tag error" property="{text}">{text}</span>

  {/if}

<style lang="scss">
  .tag {
    display: inline;
    padding: 0.25em 2em;
    border-radius: 1em;
    background-color: var(--accent-4);
    color: #000;
    font-size: 0.65em;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 0.5em;
  }
  .category {
    background-color: var(--accent-2);
    color: #fff;
  }

  .info {
    background-color: var(--info);
    color: #fff;
  }
  .warning {
    background-color: var(--warning);
    color: #000;
  }
  .success {
    background-color: var(--success);
    color: #000;
  }
  .error {
    background-color: var(--error);
    color: #FFF;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>