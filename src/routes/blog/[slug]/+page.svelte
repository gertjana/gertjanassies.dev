<script lang="ts">
  import TagBar from '$src/components/TagBar.svelte';
  import CopyButton from '$src/components/CopyButton.svelte';

  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation'

  import { mermaidRendered } from '$lib/stores.ts';
  import mermaid from 'mermaid'

  import type { PageData } from './$types';
  export let data: PageData;

  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  
  onMount(() => {
    mermaidRendered.set(true)
    setTimeout(async () => {
      await mermaid.run()
    }, 0)
  });

  afterNavigate(() => {
    for (const node of document.querySelectorAll('pre > code')) {
      console.log(node);
      new CopyButton({ // use whatever Svelte component you like here
        target: node,
        props: {
          content: node.textContent ?? '',
          //style: 'position: absolute; top: 1ex; right: 1ex;', // requires <pre> to have position: relative;
        },
      })
    }
  })

</script>

<h1>{data.post.title ?? "no title"}</h1>
{#if ! data.post.published}
  <span class="draft">DRAFT</span>
{/if}
<div class="tags">
  <TagBar path="/blog" tags="{data.post.tags}" category="{data.post.category}" />
</div>
<div class="content">
  <sub class="views">with {data.pageviews} views</sub>  
  <sub class="date">on {data.post.date ?? "..."}</sub>
  <sub class="author">by {data.post.author ?? "..."}</sub>  
</div>
<br/>
{#if data.post.image}
  <img src="{data.post.image}" alt="{data.post.title}"/>
{/if}

<svelte:component this={data.component} />

{data.pageviews}
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

  sub.views {
    float:right;
    margin-right: 0.5em;
    font-size: smaller;
  } 
  sub.date {
    float: right;
    margin-right: 0.5em;
  }
  img {
    float:right;
    width:25%;
    margin-left: 2em;
  }
  span.draft {
    color: var(--error);
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 1em;
  }

  :global(button) {
    float: right;
    padding: 0.5em;
    background: var(--accent-4);
    border: none;
    border-radius: 0 0 0 0.5em;
    color: var(--text);
    font-size: 0.8em;
    cursor: pointer;
  }
</style>