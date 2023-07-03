<script lang="ts">
    import Post from '$src/components/Post.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    const tag = data.tag;
    const category = data.category;

    let posts = data.posts;   

    if (tag != undefined) {
        posts = posts.filter(post => {
            if (post.tags == undefined || post.tags == "") return false; 
            return post.tags.indexOf(tag) != -1
        });
    } else if (category != undefined) {
        posts = posts.filter(post => {
            if (post.category == undefined || post.category == "") return false;
            return post.category == category;
        });
    }

</script>

{#each posts as post}
    <Post post="{post}" />
{/each}
