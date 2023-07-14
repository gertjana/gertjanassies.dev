import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageView } from '$lib/types';

let prefix = "prod:";

export const redis = () => {
  let connection = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";
  return new Redis(connection);    
}


export const incrementPageView = async (slug: string) => {
  if (dev) { prefix = "dev:"; }
  await redis().incr(`${prefix}post:${slug}:views`);
}

export const getPageViews: () => Promise<PageView[]> = async () => {
  if (dev) { prefix = "dev:"; }
  const keys = await redis().keys(`${prefix}post:*:views`);
  if (keys.length != 0) {
    const views: string[] = (await redis().mget(...keys)).map((view) => view ?? '0');
    return keys.map((key, index) => {
        const slug = key.split(':')[2];
        return {
            slug: slug,
            views: parseInt(views[index])
        }
    });
  } else {
    return [];
  }
};