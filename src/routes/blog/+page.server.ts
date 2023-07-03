
import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts';
 
export const load = (async ({ url }) => {
  return {
    posts: posts,
    tag: url.searchParams.get('tag'),
    category: url.searchParams.get('category')
  };
}) satisfies PageServerLoad;


