<script lang="ts">
    import Posts from '$src/components/Posts.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    let posts = data.posts
</script>

# Home page

This is my personal space where I talk about technology, coding, the maker space and anything else that interests me

## Featured blogs

<Posts posts={data.posts} size={3} tag="featured" show={false} />

## todo

* ~~render markdown~~
* ~~slug based routes for blogs~~
* ~~bug: syntax highligting~~
* ~~metadata (frontmatter) at top of markdown files~~
* ~~List of blogs~~
* ~~sort blog list on date desc~~
* ~~divide into Make and Code~~ ~~list for tags~~
* ~~support categories~~
* ~~Pinned blogs on homepage~~
* ~~bug: running in node gives an error~~
* ~~pagination~~
* dark/light theme
