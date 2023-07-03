<script lang="ts">
    import TagBar from "./TagBar.svelte";

        export let post: { title: string, summary: string, date: string, author: string, tags: string, category: string, image: string, slug: string};

    const u = (x: string) => { if (x == undefined) return ""; else return x;}
</script>

<article class="post">
    <h3><a href="/blog/{post.slug}">{post.title}</a></h3>
    <section class="tags">
        <TagBar path="/blog" tags="{post.tags}" category="{post.category}" />
    </section>
    <section class="content">
        {#if post.image}
            <img src="{post.image}" alt={post.title}/>
        {/if}
        <sub>by {u(post.author)} on {u(post.date)}</sub>
        <p>{u(post.summary)}</p>
    </section>
</article>

<style lang="scss">
    p {
        width: 80%;
    }
    h3 {
        display: inline;
    }

    article.post {
        min-height: 150px;
        margin-bottom: 3em;
        clear:both;
    }
    section.tags {
        display:block;
        float:right;
        margin-bottom: 0.0em;
    }

    section.content {
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
