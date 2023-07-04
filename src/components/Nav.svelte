<script lang="ts">
</script>

<div class="left">
    <a href="/">
        <img src="/logo_ga.svg" alt="logo" height="60">
    </a>
    <h2>gertjanassies.dev</h2><br/>
    <sub>ramblings of a chaotic mind</sub>
</div>
    <!-- Theme<ThemeSwitch /> -->
<div class="right">
    <nav>
        <a data-sveltekit-reload href="/">home</a>
        <a data-sveltekit-reload href="/blog">blog</a>
        <a data-sveltekit-reload href="/blog?category=code">code</a>
        <a data-sveltekit-reload href="/blog?category=make">make</a>
        <a data-sveltekit-reload href="/blog?category=life">life</a>
        <a data-sveltekit-reload href="/about">about</a>
    </nav>
</div>
<br style="clear: both;"/>

<style lang="scss">
    div.left {
        float: left;
        border-bottom: 1px solid var(--accent-2);
        width: 400px;
    }
    div.right {
        float: right;
    }
    h2 {
        margin: 0;
        display: inline;
    }
    sub {
        display: inline;
        margin-left: 3em;
    }
    nav {
        float: right;
        margin-top: 3em;
        margin-right: 2em;
        vertical-align: bottom;
        border-bottom: 1px solid var(--accent-1)
    }
    img {
        float:left;
        margin-bottom: 1em;
        margin-right: 2em;
    }
    nav a {
        margin-right: 2em;
        text-decoration-line: none;
    }
</style>
