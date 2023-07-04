<script lang="ts">
    export let text :string;

    export let type : string;

    export let path: string;
</script>

{#if type == 'category'}
    <span class="tag category" property="{text}"><a data-sveltekit-reload href="{path}?category={text}">{text}</a></span>
{:else}
    <span class="tag" property="{text}"><a data-sveltekit-reload href="{path}?tag={text}">{text}</a></span>
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

    a {
        color: inherit;
        text-decoration: none;
    }
</style>