<script lang="ts">
  export let slug: string;
  export let url: string;

  const handleLikes = async () => {
    await fetch(`/api/likes`, {
          method: 'POST',
          body: JSON.stringify({slug: slug ?? ''}),
          headers: {'Content-Type': 'application/json' }
        });
  }

  const handleShare = async () => {
    await navigator.clipboard.writeText(url);
    alert(`Copied ${url} to clipboard`);
  }
</script>

<div class="social">
    <span title="click to like">
        <svg on:click="{handleLikes}" on:keydown="{handleLikes}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="currentColor"><path d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.181a.833.833 0 0 1-.822-.969l.663-4.045a4.783 4.783 0 0 0-.09-1.973a1.635 1.635 0 0 0-1.092-1.137l-.145-.047a1.346 1.346 0 0 0-.994.068c-.34.164-.588.463-.68.818l-.476 1.834a7.628 7.628 0 0 1-.656 1.679c-.415.777-1.057 1.4-1.725 1.975l-1.439 1.24a1.67 1.67 0 0 0-.572 1.406l.812 9.393A1.666 1.666 0 0 0 8.597 22h4.648c3.482 0 6.453-2.426 7.025-5.735Z"/><path fill-rule="evenodd" d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749Z" clip-rule="evenodd"/></g></svg>        
    </span>
    <span title="click to copy this url to the clipboard">
        <svg on:click="{handleShare}" on:keydown="{handleShare}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m16 5l-1.42 1.42l-1.59-1.59V16h-1.98V4.83L9.42 6.42L8 5l4-4l4 4zm4 5v11c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3a2 2 0 0 1 2 2z"/></svg>
    </span>
</div>

<style>
    div {
        display: inline;
        margin-left: 1em;
    }
    span {
        cursor: pointer;
    }
</style>