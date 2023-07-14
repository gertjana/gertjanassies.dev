import type { PageServerLoad } from './$types';
import { getPageViews, incrementPageView } from '$lib/server/redis';

export const load: PageServerLoad = (async () => {
    await incrementPageView("stats");
    return {
        pageviews: getPageViews(),
    };
  })