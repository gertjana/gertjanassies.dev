<script lang="ts">
  import  type { PageStat } from '$lib/types';

  /** Array of PageView's */
  export let data: PageStat[];

  let sorted: PageStat[] = data.sort((a, b) => b.views - a.views);

  const ratio = (reads: number, views: number) => {
    return Math.round((reads / views) * 100);
  }
</script>


{#if sorted.length === 0}
  <p>No pageviews yet.</p>
{:else}
  <table class="pageviews">
    <thead>
      <tr>
          <th>page</th>
          <th>views</th>
          <th>reading time</th>
          <th>page reads</th>
          <th>read ratio</th>
          <th>likes</th>
      </tr>
    </thead>
    <tbody>
      {#each sorted as item}
        <tr>
          <td>{item.slug}</td>
          <td class="center">{item.views}</td>
          <td class="center">{#if item.time != 0}{item.time} min{:else}-{/if}</td>
          <td class="center">{#if item.reads != 0}{item.reads}{:else}-{/if}</td>
          <td class="center">{#if item.reads != 0} {ratio(item.reads,item.views)} %{:else}-{/if}</td>
          <td class="center">{item.likes?? '-'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table.pageviews {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td.center {
    text-align: center;
    padding-top: 0.2em;
  }
</style>