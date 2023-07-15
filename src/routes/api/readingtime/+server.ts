import { updateReadingTime } from '$src/lib/server/redis.js'

export const POST = async ({request }) => {
   const data = await request.json();

  let readingTime = await updateReadingTime(data.slug, data.content);

  return new Response(JSON.stringify({ readingTime: readingTime }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}