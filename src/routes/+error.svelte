<script>
// @ts-nocheck

    import { page } from '$app/stores';

    const emojis = {
        // TODO add the rest!
        404: '🧱',
        420: '🫠',
        500: '💥'
    };
</script>

<h1>{$page.status} {$page?.error?.message}</h1>
<span style="font-size: 5em">
    {emojis[$page?.status] ?? emojis[500]}
</span>