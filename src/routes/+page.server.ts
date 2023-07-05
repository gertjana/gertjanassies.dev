import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts';

export const load: PageServerLoad = (async ({ url }) => {
  return {
    posts: posts,
  };
})

