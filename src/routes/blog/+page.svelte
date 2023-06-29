<script>
    import Post from '$src/components/Post.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    const allPostsFiles = import.meta.glob(`/blogs/*.md`);
    const iterable = Object.entries(allPostsFiles);

    const allPosts = Promise.all(
        iterable.map(async ([path, page]) => {
            const { metadata } = await page();
            const postPath = path.replace(/^\/blogs\/(.*)\.md$/, '$1');
            return {
                meta: metadata,
                path: postPath
            };
    }));

    const perTag = (postsPromise, tag) => {
        return postsPromise.then(posts =>
            posts.filter(post => {
            console.log(post);
            if (post.meta.tags == undefined || post.meta.tag == "") return false; 
            return post.meta.tags.indexOf(tag) != -1
        })); 
    }

    const perCategory = (postsPromise, category) => {
        return postsPromise.then(posts =>
            posts.filter(post => {
                if (post.meta.category == undefined || post.meta.category == "") return false;
            return post.meta.category == category;
        }));
    }

    const tag = data.tag;
    const category = data.category;

    let postsPromise = allPosts;   
    if (tag != undefined) {
        postsPromise = perTag(allPosts, tag)
    } else if (category != undefined) {
        postsPromise = perCategory(allPosts, category)
    } 

</script>

{#await postsPromise}
    <p>...</p>
{:then posts} 
    {#each posts as post}
        <Post post="{post}" />
    {/each}
{:catch error}
    <p>Oopsie: {error}</p>    
{/await}

