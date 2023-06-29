<script>
    import Post from '$src/components/Post.svelte';
    import { construct_svelte_component } from 'svelte/internal';

    /** @type { string } */
    export let tag;

    /** @type { number } */
    export let size;

    const allPostsFiles = import.meta.glob(`/blogs/*.md`);
    const iterable = Object.entries(allPostsFiles).reverse();

    const allPosts = Promise.all(
        iterable
            .map(async ([path, page]) => {
                const { metadata } = await page();
                const postPath = path.replace(/^\/blogs\/(.*)\.md$/, '$1');
                return {
                    meta: metadata,
                    path: postPath
                };
            })
        );

    const perTag = (postsPromise, tag) => {
        return postsPromise.then(posts =>
            posts.filter(post => {
            if (post.meta.tags == undefined || post.meta.tag == "") return false; 
            return post.meta.tags.indexOf(tag) != -1
        })); 
    }
    // console.log(tag, size)
    let postsPromise = perTag(allPosts, tag);
</script>

<div class="posts">
    {#await postsPromise }
        ... 
    {:then posts }
        {#each posts.slice(0, size) as post}
            <Post post="{post}" />
        {/each}
    {:catch error}
        <p>{error}</p>
    {/await}
</div>

<style lang="scss">
    div.posts {
        margin-top: 1em;
    }
</style>