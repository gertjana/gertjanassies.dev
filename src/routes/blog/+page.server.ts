
import { posts } from '$lib/server/posts';
import { getClient, incrementPageView } from '$src/lib/server/redis';


import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ url }) => {
  await incrementPageView(getClient(), "blog");
  
  return {
    posts: posts,
    tag: url.searchParams.get('tag'),
    category: url.searchParams.get('category')
  };
});


