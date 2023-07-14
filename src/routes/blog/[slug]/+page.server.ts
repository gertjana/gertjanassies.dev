import { posts } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { incrementPageView } from '$lib/server/redis';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  // get post metadata
  const post = posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, `Post: '${slug}' not found!`);
  }

  let pageviews = await incrementPageView(slug);

  return {
    post,
    pageviews,
  };
};
