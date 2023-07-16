
import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts';
import { incrementPageView } from '$src/lib/server/redis';

export const load: PageServerLoad = (async ({ url }) => {
  await incrementPageView("blog");
  
  return {
    posts: posts,
    tag: url.searchParams.get('tag'),
    category: url.searchParams.get('category')
  };
});


