import { posts } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { incrementPageView, getReadingTime } from '$lib/server/redis';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const post = posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, `Post: '${slug}' not found!`);
  }

  let stats = {
    pageviews: await incrementPageView(slug),
    readingTime: await getReadingTime(slug),
  }

  return {
    post,
    stats,
  };
};
