<script lang="ts">
  import  type { PageStat } from '$lib/types';

  /** Array of PageView's */
  export let data: PageStat[];

  let sorted: PageStat[] = data.sort((a, b) => b.views - a.views);

console.log(sorted);
</script>


{#if sorted.length === 0}
  <p>No pageviews yet.</p>
{:else}
  <table class="pageviews">
    <thead>
      <tr>
          <th>Page</th>
          <th>Views</th>
          <th>Reading Time</th>
      </tr>
    </thead>
    <tbody>
      {#each sorted as item}
        <tr>
          <td>{item.slug}</td>
          <td class="views">{item.views}</td>
          <td class="">{item.readingTime ?? '-'} min</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table.pageviews {
    width: 40%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  td.views {
    text-align: center;
    padding-top: 0.2em;
  }
</style>