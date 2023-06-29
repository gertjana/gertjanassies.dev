---
title: New Blog
date: "2023-06-27"
author: Gertjan Assies
summary: Learning about Svelte by making a blog
tags: svelte, markdown
category: code
image: ""

---

## Learning experience

I wanted to learn more about creating web applications with [SvelteKit](https://kit.svelte.dev/docs/introduction) (which consists of Svelte and Vite) 

so I decided to make a personal blog

so what is sveltekit? (from the website)

> SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. If you're coming from React, SvelteKit is similar to Next. If you're coming from Vue, SvelteKit is similar to Nuxt.

Sveltekit using Svelte (an UI)





## Example

```svelte
<script>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  clicks: {count}
</button>
```
