import type { PageServerLoad } from './$types';
import { getPageViews } from '$lib/server/redis';

export const load: PageServerLoad = (async () => {
    return {
        pageviews: getPageViews(),
    };
  })