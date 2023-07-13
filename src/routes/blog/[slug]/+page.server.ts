import { posts } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import redis from '$lib/server/redis';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  // get post metadata
  const post = posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, `Post: '${slug}' not found!`);
  }

  let pageviews = dev ? await redis.incr(`post:${slug}:views`) : -1;

  return {
    post,
    pageviews,
  };
};
