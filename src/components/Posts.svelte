<script lang="ts">
    import Post from '$src/components/Post.svelte';
    import type { MetaData } from '$lib/server/posts';

    export let metadata: MetaData[];

    export let tag : string;

    export let category: string;
    
    export let size: number;

    if (category != undefined && category != "") {
        metadata = metadata.filter(post => {
            if (post.category == undefined || post.category == "") return false;
            return post.category == category;
        });
    } else if (tag != undefined && tag != "all") {
        metadata = metadata.filter(post => {
            if (post.tags == undefined || post.tags == "") return false; 
            return post.tags.indexOf(tag) != -1
        });
    }
</script>

<article class="posts">
    {#each metadata.slice(0, size) as post}
        <Post metadata="{post}" />
    {/each}
</article>

<style lang="scss">
    article.posts {
        margin-top: 1em;
    }
</style>