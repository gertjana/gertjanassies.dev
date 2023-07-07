<script lang="ts">
    import { LightPaginationNav } from 'svelte-paginate';
    import Post from '$src/components/Post.svelte';
    import type { MetaData } from '$lib/server/posts';

    export let posts: MetaData[];

    export let tag : string;

    export let category: string;
    
    export let size: number;

    export let showPagination: boolean = true;

    let currentPage = 1

    let pageSize = size

    const paginate = (posts: MetaData[], pageSize: number, currentPage: number) => {
        return posts.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
    }

    posts = posts.filter(post => post.published === true)

    if (category) {
        posts = posts.filter(post => {  
            return post.category == category;
        });
    } else if (tag && tag != "all") {
        posts = posts.filter(post => {
            return post.tags.indexOf(tag) != -1
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


