<script lang="ts">
  import { page } from '$app/stores';

  const emojis = {
    404: '🧱',
    420: '🫠',
    500: '💥'
  };
  let emoji: string = emojis[page.status] ?? emojis[500];
</script>

<div>
  <h1>{$page.status} {$page?.error?.message}</h1>
  <span style="font-size: 5em">
    {emoji}
  </span>
</div>

<style>
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>