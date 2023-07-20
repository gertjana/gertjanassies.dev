import { incrementLikes } from '$src/lib/server/redis.js'

/** POST /api/pagereads from frontend when the end of the article is read */
export const POST = async ({request }) => {
  const data = await request.json();

  let likes = await incrementLikes(data.slug);

  console.log(likes);
  return new Response(JSON.stringify({ likes: likes }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}