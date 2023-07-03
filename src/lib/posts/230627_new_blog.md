---
title: Made a new Blog
date: "2023-06-27"
author: Gertjan Assies
summary: Learning about Svelte by making a blog
tags: svelte, markdown, featured
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

```html
<script>
  import Posts from '$src/components/Posts.svelte';
</script>

# Home page

This is my personal space where I talk about technology, coding, the maker space and anything else that interests me

## Featured blogs

&lt;Posts tag="featured" size=3 /&gt;  

## todo

* bla

```

## What's to (or not to) love

As with most javascript/typescript frameworks, it can all too quickly becomes a bit of a mess, although during the work I learned more and more at how it all works, so I revisited working but somewhat crappy code multiple times.

So lets categorize that as a steep learning curve and my tendency to just start assembling the swedish furniture instead of reading the manual first.

I think with the modular (components) setup, thought out defaults, and ability to run the component's code on the server or client (or both) makes it very powerful and flexible.

Vite making developing a pleasure with it's almost instantly refreshing pages everytime you press save. and Typescript making sure you're component properties/attributes can only hold the right stuff.
