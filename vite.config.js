import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

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