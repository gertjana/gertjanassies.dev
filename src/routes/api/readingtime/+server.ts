import { updateReadingTime } from '$src/lib/server/redis.js'
import type { RequestEvent } from './$types';

/** POST /api/readingtime from frontend to calculate reading time */
export const POST = async ({request}:RequestEvent) => {
   const data = await request.json();

  let readingTime = await updateReadingTime(data.slug, data.content);

  return new Response(JSON.stringify({ readingTime: readingTime }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}