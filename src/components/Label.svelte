<script lang="ts">
  /** Comma separated list of tags */
  export let text :string;
  
  /** type of label [info, warning, success, error] */
  export let type : string;
  
</script>
  
{#if type == 'warning'}
  <span class="warning" property="{text}">{text}</span>
{:else if type == 'info'}
  <span class="info" property="{text}">{text}</span>
{:else if type == 'success'}
  <span class="success" property="{text}">{text}</span>
{:else if type == 'error'}
  <span class="error" property="{text}">{text}</span>
{/if}

<style lang="scss">
  span {
    display: inline;
    padding: 0.25em 2em;
    border-radius: 0.3em;
    font-size: 0.65em;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 0.5em;
  }

  .info {
    background-color: var(--info);
    color: #000;
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
</style>