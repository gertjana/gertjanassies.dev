<script lang="ts">
    import { writable } from 'svelte/store';
    import { bind } from 'svelte/internal';

    const theme = writable('system');
</script>

<select bind:value={$theme}>
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>

<style>
    select {
        position: relative;
        margin-right: 2em;
    }
</style>