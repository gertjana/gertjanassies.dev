import type { PageServerLoad } from './$types';
import { getPageStats} from '$lib/server/redis.ts';

export const load: PageServerLoad = (async () => {
    return {
        pageviews: getPageStats(),
    };
  })