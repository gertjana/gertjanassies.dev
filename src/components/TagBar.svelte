<script lang="ts">
  import Tag from "./Tag.svelte";

  export let tags: string;

  export let category: string;
  
  export let path: string;
</script>

{#if tags}
  {#each tags.split(', ') as tag}
    <Tag path={path} type="tag" text="{tag.trim()}" />
  {/each}
{/if}
{#if category}
  <Tag path={path} type="category" text="{category.trim()}" />
{/if}
