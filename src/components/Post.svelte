<script>
    import TagBar from "./TagBar.svelte";

    //TODO make meta a proper type describing the frontmatter
    /** @type {{ meta: any, path: string }} */
    export let post;

    /** @type { (arg0: string) => string } */
    const u = (x) => { if (x == undefined) return ""; else return x;}
</script>

<div class="post">
    <h3><a href="/blog/{post.path}">{post.meta.title}</a></h3>
    <div class="tags">
        <TagBar path="/blog" tags="{post.meta.tags}" category="{post.meta.category}" />
    </div>
    <div class="content">
        {#if post.meta.image}
            <img src="{post.meta.image}" alt={post.meta.title}/>
        {/if}
        <sub>by {u(post.meta.author)} on {u(post.meta.date)}</sub>
        <p>{u(post.meta.summary)}</p>
    </div>
</div>

<style lang="scss">
    p {
        width: 80%;
    }
    h3 {
        display: inline;
        border: none !important;
    }

    div.post {
        min-height: 150px;
        margin-bottom: 3em;
        clear:both;
    }
    div.tags {
        display:block;
        float:right;
        margin-bottom: 0.0em;
    }

    div.content {
        margin-top: 0.25em;
        width: 100%;
        border-top: 1px solid var(--accent-4);
        margin-bottom: 3em;
    }
    sub {
        float:right;
    }
    img {
        float:left;
        width: 150px;
        margin-top: 1em;
        margin-right: 1em;
    }
</style>
