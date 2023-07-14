<script lang="ts">

</script>

<div>
  <button title="todo" on:click="{(e) => {e.preventDefault();window.location.href='/todo';}}">
    <!-- https://icones.js.org/collection/all?s=octicon:checklist-16 -->
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13.274 9.537v-.001l-4.557 4.45a.75.75 0 0 1-1.055-.008l-1.943-1.95a.75.75 0 0 1 1.062-1.058l1.419 1.425l4.026-3.932a.75.75 0 1 1 1.048 1.074ZM4.75 4h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM4 7.75A.75.75 0 0 1 4.75 7h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 4 7.75Z"/></svg>
  </button>
  <button title="stats" on:click="{(e) => {e.preventDefault();window.location.href='/stats';}}">
    <!-- https://icones.js.org/collection/all?s=nimbus-stats -->
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M1.75 13.25V1.5H.5v12a1.24 1.24 0 0 0 1.22 1H15.5v-1.25z"/><path fill="currentColor" d="M3.15 8H4.4v3.9H3.15zm3.26-4h1.26v7.9H6.41zm3.27 2h1.25v5.9H9.68zm3.27-3.5h1.25v9.4h-1.25z"/></svg>
  </button>
  <p>
    Opinions expressed here are my own and not the views of my employer or anyone else, (re)use is free, but quoting the source is appreciated.<br/>
    This blog is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. © 2023 by Gertjan Assies    
  </p>
</div>


<style lang="scss">
  div {
    text-align: center;
    width: 100%;
    border-top: 1px solid var(--accent-2);
  }
  p {
    font-size: smaller;
    font-style: italic;
  }

  button {
    float:right;
    border: none;
    background: none;
    margin: 0;
    margin-top: 0.5em;
  }
</style>
