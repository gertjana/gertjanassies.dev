import type { PageServerLoad } from './$types';
import { getClient, incrementPageView } from '$lib/server/redis';
import { posts } from '$lib/server/posts';

export const load: PageServerLoad = (async ({ url }) => {
  await incrementPageView(await getClient(), "home");
  return {
    posts: posts,
  };
})
