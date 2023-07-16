<script lang="ts">
  import Tag from "./Tag.svelte";

  /** Comma separated list of tags */
  export let tags: string;

  /** Category */
  export let category: string;
  
  /** Base Path to the page the tag/category should link too */
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
