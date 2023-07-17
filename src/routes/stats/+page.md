<script lang="ts">
  import PageViews from '$src/components/PageViews.svelte'

  import type { PageData } from './$types';
  export let data: PageData;
</script>

# Pagestats

<PageViews data={data.pageviews} />
