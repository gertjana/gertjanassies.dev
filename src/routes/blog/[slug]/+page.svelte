<script>
// @ts-nocheck
    import Tag from '$src/components/Tag.svelte';
    import TagBar from '$src/components/TagBar.svelte';
    /** @type {import('./$types').PageData} */
    export let data;

    /** @type { (arg0: string) => string } */
    const u = (x) => { if (x == undefined) return ""; else return x;}

</script>

{#await data.content}
    <div>loading...</div>
{:then content}
    <h1>{content?.data?.fm?.title}</h1>
    <div class="tags">
        <TagBar path="/blog" tags="{content?.data?.fm?.tags}" category="{content?.data?.fm?.category}" />
    </div>
    <div class="content">
        <sub class="date">on {u(content?.data?.fm?.date)}</sub>
        <sub class="author">by {u(content?.data?.fm?.author)}</sub>    
    </div>
    <br/>
    {#if content?.data?.fm?.image}
        <img src="{content?.data?.fm?.image}" alt="{content?.data?.fm?.title}"/>
    {/if}
    {@html content?.code
                .replaceAll(/\@html /g, '')
                .replaceAll(/\{\`/g, '')
                .replaceAll(/\`\}/g, '')
    }    
{/await}

<style>
    div.content {
        width: 100%;
        border-top: 1px solid var(--accent-4);
        margin-bottom: 2em;
    }

    div.tags {
        display:inline;
        float:right;
        position: relative;
        top: 1em;
}

    h1 {
        display: inline;
        margin-top: 2em;
    }

    sub {
        display: inline;
    }

    sub.author {
        float:right;
        margin-right: 0.5em;
    }
    sub.date {
        float: right;
    }

    img {
        float:right;
        width:400px;
        margin-left: 2em;
    }
</style>