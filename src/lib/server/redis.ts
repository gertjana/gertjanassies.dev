import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageView } from '$lib/types';
import { getRequest } from '@sveltejs/kit/node';

let prefix = "prod";

export const redis = () => {
  let connection = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";
  return new Redis(connection);    
}

export const getReadingTime = async (slug: string) => {
  return await redis().get(`${prefix}:post:${slug}:readingtime`);
}

export const updateReadingTime = async (slug: string, content: string) => {
  if (dev) { prefix = "dev"; }

  let words = content.split(/\s/g).length;

  let readingTime = Math.ceil(words / 200);

  await redis().set(`${prefix}:post:${slug}:readingtime`, readingTime);

  return readingTime;
}

export const incrementPageView: (slug: string) => Promise<number>  = async (slug: string) => {
  if (dev) { prefix = "dev"; }
  return await redis().incr(`${prefix}:post:${slug}:views`);
}

export const getPageStats: () => Promise<PageView[]> = async () => {
  if (dev) { prefix = "dev"; }
  const keys_views = await redis().keys(`${prefix}:post:*:views`);
  const keys_reading_time = await redis().keys(`${prefix}:post:*:readingtime`);
  if (keys_views.length != 0) {
    const views = (await redis().mget(...keys_views)).map((view) => view ?? '0');
    const reading_times = (await redis().mget(...keys_reading_time)).map((view) => view ?? '0');
    return keys_views.map((key, index) => {
        const slug = key.split(':')[2];
        return {
            slug: slug,
            views: parseInt(views[index]),
            readingTime: parseInt(reading_times[index])
        }
    });
  } else {
    return [];
  }
};