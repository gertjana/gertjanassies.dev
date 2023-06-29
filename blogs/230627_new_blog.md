---
title: New Blog
date: "2023-06-27"
author: Gertjan Assies
summary: Learning about Svelte by making a blog
tags: svelte, markdown
category: code
image: "/images/jess-bailey-l3N9Q27zULw-unsplash.jpg"

---

## Learning experience

I wanted to learn more about creating web applications with [SvelteKit](https://kit.svelte.dev/docs/introduction) (which consists of Svelte and Vite)

so I decided to make a personal blog

so what is [Sveltekit](https://kit.svelte.dev/)? (from the website)

> SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. If you're coming from React, SvelteKit is similar to Next. If you're coming from Vue, SvelteKit is similar to Nuxt.

Sveltekit uses [Svelte](https://svelte.dev/) an UI framework and [vite](https://vitejs.dev/), frontend tooling to help develop/run locally, with automatic reloading and caching for fast development.
and takes most of the configuration and routing away




## Markdown

Thanks to the [mdsvex](https://mdsvex.pngwn.io/) pre-processer, I can keep writing my blogs and most pages in markdown where it is possible to embed Svelte Components in your markdown, for more interactivity

Mdsvex will pre-process the content to first render the markdown and then pass the result on to svelte to render all the components

for instance the content for the homepage looks like this:

```svelte
<script>
  import Posts from '$src/components/Posts.svelte';
</script>

# Home page

This is my personal space where I talk about technology, coding, the maker space and anything else that interests me

## Featured blogs

<Posts tag="featured" size=3 />

## todo

* bla

```

## What's not to love

As with all javascript/typescript frameworks, it all too quickly becomes a bit of a mess, I wanted all the scripting done with TypeScript, but mdsvex does not support that, so I ended up with a mix of javascript and typescript with types defined in comments, and something typescript error's ignored just to get stuff working.

