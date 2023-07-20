<script lang="ts">
  import Posts from '$src/components/Posts.svelte';

  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<Posts posts="{data.posts}" size={5} tag="{data.tag || 'all'}" category="{data.category || ''}" />
