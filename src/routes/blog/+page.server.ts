
import type { PageServerLoad } from './$types';
 
export const load = (async ({ url }) => {
  return {
    tag: url.searchParams.get('tag'),
    category: url.searchParams.get('category')
  };
}) satisfies PageServerLoad;

