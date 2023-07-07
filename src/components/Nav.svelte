<script lang="ts">
</script>

<div class="header-left">
  <a href="/">
    <img src="/logo_ga.svg" alt="logo" height="60">
  </a>
  <h2>gertjanassies.dev</h2><br/>
  <sub>ramblings of a chaotic mind</sub>
</div>

<div class="header-right">
  <nav>
    <a href="/">home</a>
    <a href="/blog">blog</a>
    <a href="/about">about</a>
    <span>categories:</span>
    <a data-sveltekit-reload href="/blog?category=code">code</a>
    <a data-sveltekit-reload href="/blog?category=make">make</a>
    <a data-sveltekit-reload href="/blog?category=tooling">tooling</a>
    <a data-sveltekit-reload href="/blog?category=life">life</a>
  </nav>
</div>
<br style="clear: both;"/>

<style lang="scss">
  div.header-left {
    float: left;
    border-bottom: 1px solid var(--accent-2);
    width: 400px;
  }
  div.header-right {
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
    margin-right: 1em;
    vertical-align: bottom;
    border-bottom: 1px solid var(--accent-1)
  }

  nav span {
    margin-top: 3em;
    margin-left: 1em;
    vertical-align: bottom;
    color: var(--accent-1);
  }
  img {
    float:left;
    margin-bottom: 1em;
    margin-right: 2em;
  }
  nav a {
    margin-right: 1em;
    text-decoration-line: none;
  }
</style>
