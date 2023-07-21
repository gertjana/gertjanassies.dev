import { incrPageReads } from '$src/lib/server/redis.js'
import type { RequestEvent } from './$types';

/** POST /api/pagereads from frontend when the end of the article is read */
export const POST = async ({request}:RequestEvent) => {
  const data = await request.json();

  let pageReads = await incrPageReads(data.slug);

  return new Response(JSON.stringify({ pageReads: pageReads }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}