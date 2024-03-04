import type { PageServerLoad } from './$types';
import { getClient, getPageStats} from '$lib/server/redis.ts';

export const load: PageServerLoad = (async () => {
  return { pageviews: await getPageStats(await getClient()) };
})