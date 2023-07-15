import type { PageLoad } from './$types';
export const load: PageLoad = async ({ data }) => {
  const component = await import(`../../../../content/${data.post.slug}.md`);

  return {
    post: data.post,
    component: component.default,
    stats: data.stats,
  };
};
