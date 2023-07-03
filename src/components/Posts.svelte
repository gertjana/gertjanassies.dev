<script lang="ts">
    import Post from '$src/components/Post.svelte';

    export let posts: {title: string, summary: string, date: string, author: string, tags: string, category: string, image: string, slug: string}[];

    export let tag : string;

    export let category: string;
    
    export let size: number;

    if (category != undefined && category != "") {
        posts = posts.filter(post => {
            if (post.category == undefined || post.category == "") return false;
            return post.category == category;
        });
    } else if (tag != undefined && tag != "all") {
        posts = posts.filter(post => {
            if (post.tags == undefined || post.tags == "") return false; 
            return post.tags.indexOf(tag) != -1
        });
    }
</script>

<article class="posts">
    {#each posts.slice(0, size) as post}
        <Post post="{post}" />
    {/each}
</article>

<style lang="scss">
    article.posts {
        margin-top: 1em;
    }
</style>