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
  
  let readingTime = '0';
  
  onMount(async () => {
    console.log('onMount');
    mermaidRendered.set(true)
    setTimeout(async () => {
      await mermaid.run()
    }, 0)

    if (!data.stats.readingTime || data.stats.readingTime === '0') {
      let postData = {
        content: document.querySelector('.content')?.textContent ?? '',
        slug: data.post.slug ?? '',
      }
      const resJson = await fetch(`/api/readingtime`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      readingTime = resJson.readingTime;
    } else {
      readingTime = data.stats.readingTime;
    }
   });

  afterNavigate(() => {
    for (const node of document.querySelectorAll('pre > code')) {
      console.log(node);
      new CopyButton({ 
        target: node,
        props: {
          content: node.textContent ?? '',
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
  <sub class="date">on {data.post.date ?? "..."}</sub>
  <sub class="author">by {data.post.author ?? "..."}</sub>  
  <sub class="readingtime">viewed {data.stats.pageviews} times, reading time {readingTime ?? ""} min</sub>
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