<script lang="ts">
  import  type { PageStat } from '$lib/types';
    import { to_number } from 'svelte/internal';

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
          <th title="">page</th>
          <th title="nr of time the page has been viewed">views</th>
          <th title="calculated time to read the post based on 200 words/min">reading time</th>
          <th title="how many times the end of the article was reached">page reads</th>
          <th title="posts read divided by posts view">read ratio</th>
          <th title="how much time the like button was clicked">likes</th>
      </tr>
    </thead>
    <tbody>
      {#each sorted as item}
        <tr>
          <td>
            {#if parseInt(item.slug.charAt(0))}
              <a href="/blog/{item.slug}">{item.slug}</a>
            {:else}
            <a href="/{item.slug}">{item.slug}</a>
            {/if}
          </td>
          <td class="center">{item.views}</td>
          <td class="center">{#if item.time  ?? 0 != 0}      {item.time} min                  {:else} - {/if}</td>
          <td class="center">{#if item.reads ?? 0 != 0}      {item.reads}                     {:else} - {/if}</td>
          <td class="center">{#if item.reads ?? 0 != 0}      {ratio(item.reads,item.views)} % {:else} - {/if}</td>
          <td class="center">{#if item.likes ?? 0 != 0}      {item.likes}                     {:else} - {/if}</td>
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