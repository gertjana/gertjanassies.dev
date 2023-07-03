import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts';

export const load = (async ({ url }) => {
  return {
    posts: posts,
  };
}) satisfies PageServerLoad;

