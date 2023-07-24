import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	server: {
		fs: {
			allow: ['..'],
		},
	},
	plugins: [
		sveltekit(),
	],
	test: {
		globals: true,
		environment: "jsdom",
	}
});