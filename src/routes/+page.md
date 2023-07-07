<script lang="ts">
  import Posts from '$src/components/Posts.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let posts = data.posts
</script>

# Home page

This is my personal space where I talk about technology, coding, the maker space and anything else that interests me

## Featured blogs

<Posts posts={data.posts} size={5} tag="featured" showPagination={false} />
