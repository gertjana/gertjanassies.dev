<script lang="ts">
  import { page } from '$app/stores';


  let emojis = new Map<number, string>([
        [404, '🧱'],
        [420, '🫠'],
        [500, '💥'],
    ]);

  let emoji: string = emojis.get($page.status) ?? emojis.get(500) ?? '🧱';
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