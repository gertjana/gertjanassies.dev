import { posts } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import { getPageStat } from '$lib/server/redis';

import type { PageServerLoad } from './$types';
import type { PageStat } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const post = posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, `Post: '${slug}' not found!`);
  }

  let stats: PageStat | undefined = await getPageStat(slug);
 
  return {
    post,
    stats,
  };
};
