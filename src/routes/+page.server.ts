import type { PageServerLoad } from './$types';
import { incrementPageView } from '$lib/server/redis';
import { posts } from '$lib/server/posts';

export const load: PageServerLoad = (async ({ url }) => {
  await incrementPageView("home");
  return {
    posts: posts,
  };
})
