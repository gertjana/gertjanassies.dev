<script lang="ts">
    import Post from '$src/components/Post.svelte';

    export let posts: {title: string, summary: string, date: string, author: string, tags: string, category: string, image: string, slug: string}[];

    export let tag : string;

    export let size: number;

    if (tag != undefined) {
        posts = posts.filter(post => {
            if (post.tags == undefined || post.tags == "") return false; 
            return post.tags.indexOf(tag) != -1
        });
    }
</script>

<div class="posts">
    {#each posts.slice(0, size) as post}
        <Post post="{post}" />
    {/each}
</div>

<style lang="scss">
    div.posts {
        margin-top: 1em;
    }
</style>