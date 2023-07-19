import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageStat } from '$lib/types';
import Page from '$src/routes/blog/+page.svelte';

let prefix = "prod";
let connection = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";

const redis = new Redis(connection);    

/** Gets the calculated reading time for a blog post */
export const getReadingTime = async (slug: string) => {
  return await redis.get(`${prefix}:post:${slug}:readingtime`);
}
/** Update the reading time by counting the words in the content of the blog article and then dividing it by 200 Words/minute */
export const updateReadingTime = async (slug: string, content: string) => {
  if (dev) { prefix = "dev"; }

  let words = content.split(/\s/g).length;
  let readingTime = Math.ceil(words / 200);

  await redis.set(`${prefix}:post:${slug}:readingtime`, readingTime);

  return readingTime;
}

/** Increments the page views by one */
export const incrementPageView: (slug: string) => Promise<number>  = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  return await redis.incr(`${prefix}:post:${slug}:views`);
}

/** returns an array of PageStat's */
export const getPageStats: () => Promise<PageStat[]> = async () => {
  if (dev) { prefix = "dev"; }

  const pageViews = await get(`${prefix}:post:*:views`);
  const readingTime = await get(`${prefix}:post:*:readingtime`);
  const pageReads = await get(`${prefix}:post:*:reads`);

  return Array.from(pageViews).map((key) => {
    return {
      slug: key[0],
      views: parseInt(key[1]),
      time: parseInt(readingTime.get(key[0]) ?? '0'),
      reads: parseInt(pageReads.get(key[0]) ?? '0')
    };
  });
}

export const updatePageReads: (slug: string) => Promise<number>  = async (slug: string) => {
  if (dev) { prefix = "dev"; }
  return await redis.incr(`${prefix}:post:${slug}:reads`);
}

const get: (slug: string) => Promise<Map<string, string>> = async (query: string) => {
  const keys = await redis.keys(query);
  if (keys.length == 0) { return new Map<string, string>(); }

  let result = new Map<string, string>();
  const key_values = (await redis.mget(...keys)).map((value) => value ?? '0');
  keys.map((key, index) => {
    const slug = key.split(':')[2];
    result.set(slug, key_values[index]);
  });
  return result;
}
