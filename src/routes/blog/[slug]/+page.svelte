<script>
// @ts-nocheck

    /** @type {import('./$types').PageData} */
    export let data;
    console.log("*** DATA: ", data);
</script>

{#await data.content}
    <div>loading...</div>
{:then content}
    <h1>{content?.data?.fm?.title}</h1>
    <sub class="date">{content?.data?.fm?.date}</sub>
    <sub class="author">{content?.data?.fm?.author}</sub>
    <hr />
    {@html content?.code
                .replaceAll(/\@html /g, '')
                .replaceAll(/\{\`/g, '')
                .replaceAll(/\`\}/g, '')
    }    
{/await}

<style>
    hr {
        clear: both;
        color: var(--accent-1);
        margin-bottom: 2em;
    }
    h1 {
        margin: 0;
        float:left;
    }

    sub {
        display: inline;
        margin-top: 1.6em;
    }

    sub.author {
        margin-left: 1em;
        float:left;
    }
    sub.date {
        float: right;
    }
</style>