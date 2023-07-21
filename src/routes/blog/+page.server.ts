
import { posts } from '$lib/server/posts';
import { incrementPageView } from '$src/lib/server/redis';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ url }) => {
  await incrementPageView("blog");
  
  return {
    posts: posts,
    tag: url.searchParams.get('tag'),
    category: url.searchParams.get('category')
  };
});


