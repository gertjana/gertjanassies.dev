<script lang="ts">
    import Tag from '$src/components/Tag.svelte';
    import TagBar from '$src/components/TagBar.svelte';
    
    import type { PageData } from './$types';

    export let data: PageData;

    // /** @type { (arg0: string) => string } */
    const u = (x: string) => { if (x == undefined) return ""; else return x;}

</script>

<h1>{data.post.title}</h1>
<div class="tags">
    <TagBar path="/blog" tags="{data.post.tags}" category="{data.post.category}" />
</div>
<div class="content">
    <sub class="date">on {u(data.post.date)}</sub>
    <sub class="author">by {u(data.post.author)}</sub>    
</div>
<br/>
{#if data.post.image}
    <img src="{data.post.image}" alt="{data.post.title}"/>
{/if}

<svelte:component this={data.component} />

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
        width:25%;
        margin-left: 2em;

    }
</style>