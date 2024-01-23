<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import CopyButton from '$src/components/CopyButton.svelte';
  import IntersectionObserver from "svelte-intersection-observer";
  import mermaid from 'mermaid'
  import { mermaidRendered } from '$lib/stores.ts';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Social from '$src/components/Social.svelte';
  import TagBar from '$src/components/TagBar.svelte';
  import { Lightbox } from 'svelte-lightbox';

  import type { PageData } from './$types';

  export let data: PageData;

  let element: HTMLElement;
  let intersecting: boolean;
  
  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  
  let readingTime = 0;

  onMount(async () => {
    mermaidRendered.set(true)
    setTimeout(async () => { await mermaid.run()}, 0)

    if (!data.stats?.time || data.stats?.time === 0) {
      const postData = {
        content: document.querySelector('.content')?.textContent ?? '',
        slug: data.post.slug ?? '',
      }
      const resJson = await fetch(`/api/readingtime`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {'Content-Type': 'application/json' }
      }).then(res => res.json());
      readingTime = resJson.readingTime;
    } else {
      readingTime = data.stats.time;
    }
   });

  afterNavigate(() => {
    for (const node of document.querySelectorAll('pre > code')) {
      new CopyButton({ 
        target: node, 
        props: { content: node.textContent ?? '' } 
      })
    }
  })

  const handleIntersection = async () => { 
    await fetch(`/api/pagereads`, {
      method: 'POST',
      body: JSON.stringify({slug: data.post.slug ?? ''}),
      headers: {'Content-Type': 'application/json' }
    });
   }

</script>

<h1>{data.post.title ?? "no title"}</h1><Social slug={data.post.slug} url={$page.url.toString()} />
{#if ! data.post.published}
  <span class="draft">DRAFT</span>
{/if}
<div class="tags">
  <TagBar path="/blog" tags="{data.post.tags}" categories="{data.post.category}" />
</div>
<div class="content">
  <sub class="date">on {data.post.date ?? "..."}</sub>
  <sub class="author">by {data.post.author ?? "..."}</sub>  
  <sub class="readingtime">reading time {data.stats?.time ?? '-'} min, viewed {data.stats?.views} times, read {data.stats?.reads ?? '-'} times, liked {data.stats?.likes ?? '-'} times</sub>
</div>
<br/>

{#if data.post.image}
  <div class="image">
    <Lightbox description="{data.post.image_attribution ?? ''}" showCloseButton={false}>
      <img src="{data.post.image}" alt="{data.post.title}"/>
    </Lightbox>  
  </div>
{/if}

<svelte:component this={data.component} />

<IntersectionObserver once {element} on:intersect={handleIntersection} bind:intersecting>
  <div bind:this={element}></div>
</IntersectionObserver>

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
  div.image {
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
  :global(span.katex-html) {
    visibility: hidden;
    }
    :global(math) {
      font-size: 1.5em;
  }

  :global(div.svelte-lightbox-footer h5) {
    padding-left: 0.2em;
    padding-top: 0.2em;
    margin:0em;
  }
  :global(div.svelte-lightbox-footer h2) {
    margin:0em;
    padding: 0em;
  }

  :global(div.svelte-lightbox-footer h5 a) {
    color: var(--accent-3-light);
  }
</style>