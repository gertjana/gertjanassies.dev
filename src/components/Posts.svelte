<script lang="ts">
  import { LightPaginationNav } from 'svelte-paginate';
  import Post from '$src/components/Post.svelte';
  
  import type { PostMetaData } from "$lib/types";

  /** Array of posts MetaData */
  export let posts: PostMetaData[];

  /** tag to filter posts on */
  export let tag : string;

  /** category to filter post on */
  export let category: string;
  
  /** number of posts per page */
  export let size: number;

  /** show or hide pagination */
  export let showPagination: boolean = true;

  let currentPage = 1

  let pageSize = size

  export const paginate = (posts: PostMetaData[], pageSize: number, currentPage: number) => {
    return posts.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
  }

  posts = posts.filter(post => post.published === true)

  if (category) {
    posts = posts.filter(post => {  
      return post.category == category;
    });
  } else if (tag && tag != "all") {
    posts = posts.filter(post => {
      return post.tags.split(",").map(t => t.trim()).includes(tag);
    });
  }
  $: paginatedPosts = paginate(posts, pageSize, currentPage)
</script>

{#if showPagination}
  <div class="pagination">
    <LightPaginationNav
    totalItems="{posts.length}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{true}"
    on:setPage="{(e) => currentPage = e.detail.page}"
    />
  </div>
{/if}
<article class="posts">
  {#each paginatedPosts as post}
      <Post metadata="{post}" />
  {/each}
</article>
{#if showPagination}
  <div class="pagination">
    <LightPaginationNav
    totalItems="{posts.length}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{true}"
    on:setPage="{(e) => currentPage = e.detail.page}"
    />
  </div>
{/if}

<style lang="scss">
  article.posts {
    margin-top: 1em;
  }

  div.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.pagination :global(.pagination-nav) {
    border: 0;
    border-bottom: 1px solid var(--accent-5);
    box-shadow: none;
  }
</style>


