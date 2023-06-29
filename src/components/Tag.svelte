<script>
    /** @type {string} */
     export let text;
    /** @type {string} */
    export let type;
    /** @type {string} */
    export let path;
</script>

{#if type == 'category'}
    <span class="category"><a data-sveltekit-reload href="{path}?category={text}">{text}</a></span>
{:else}
    <span class="tag"><a data-sveltekit-reload href="{path}?tag={text}">{text}</a></span>
{/if}

<style lang="scss">
    .tag {
        display: inline;
        padding: 0.25em 1em;
        border-radius: 0.5em;
        background-color: var(--accent-4);
        color: #000;
        font-size: 0.75em;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 0.5em;
    }
    .category {
        display: inline;
        padding: 0.25em 1em;
        border-radius: 0.5em;
        background-color: var(--accent-2);
        color: #fff;
        font-size: 0.75em;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 0.5em;
    }
</style>