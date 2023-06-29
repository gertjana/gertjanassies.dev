<script>
    import Tag from "./Tag.svelte";

    /** @type {string} */
     export let tags;
    /** @type {string} */
     export let category;
    /** @type {string} */
    export let path;

</script>

{#if tags}
    {#each tags.split(', ') as tag}
        <Tag path={path} type="tag" text="{tag.trim()}" />
    {/each}
{/if}
{#if category}
        <Tag path={path} type="category" text="{category.trim()}" />
{/if}
