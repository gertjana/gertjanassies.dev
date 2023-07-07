import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
  // TODO find a way to the root path and go from there
  const component = await import(`../../../../content/${data.post.slug}.md`);

  return {
    post: data.post,
    component: component.default,
  };
};