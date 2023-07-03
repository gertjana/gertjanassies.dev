<script lang="ts">
    import Posts from '$src/components/Posts.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Posts metadata="{data.posts}" size="{data.posts.length}" tag="{data.tag || 'all'}" category="{data.category || ''}" />