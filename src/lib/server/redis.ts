import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageStat } from '$lib/types';

let prefix = "prod";
const connection = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";

const redis = new Redis(connection);    

/** Gets the calculated reading time for a blog post */
export const getReadingTime: (slug: string) => Promise<number> = async (slug: string) => {
  return parseInt((await redis.get(`${prefix}:post:${slug}:page_stats`)) ?? '0');
}

/** Update the reading time by counting the words in the content of the blog article and then dividing it by 200 Words/minute */
export const updateReadingTime = async (slug: string, content: string) => {
  if (dev) { prefix = "dev"; }

  const words = content.split(/\s/g).length;
  const readingTime = Math.ceil(words / 200);

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    let json = JSON.parse(pageStat);
    json.time = readingTime;

    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));
    return json.time;
  }
  return readingTime;
}

/** increment the page reads */
export const updatePageReads: (slug: string) => Promise<number>  = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    let json: PageStat = JSON.parse(pageStat);
    json.reads += 1;

    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));
    return json.reads;
  }
  return 0; 
}

/** Increments the page views by one */
export const incrementPageView: (slug: string) => Promise<number>  = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    let json: PageStat = JSON.parse(pageStat);
    json.views += 1;

    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));
    return json.views;
  } else {
    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify({views: 1, reads: 0, time: 0}));
    return 0;
  }
}

/** returns an array of PageStat's */
export const getPageStats: () => Promise<PageStat[]> = async () => {
  if (process.env.MIGRATE) {
    console.log("Migrating page stats");
    await migrate();
    console.log("Migration complete");
  } 
  if (dev) { prefix = "dev"; }
  const keys: string[] = await redis.keys(`${prefix}:post:*:page_stats`);

  const values = (await redis.mget(...keys)).map((value) => value ?? '{}'); 

  const stats = keys.map((key, index) => {
    const pageStat = JSON.parse(values[index]) as PageStat;
    pageStat.slug = key.split(":")[2];
    return pageStat;
  });

  return stats;
}

const migrate = async () => {
  if (dev) { prefix = "dev"; }

  const pageViews = await get(`${prefix}:post:*:views`);
  const readingTime = await get(`${prefix}:post:*:readingtime`);
  const pageReads = await get(`${prefix}:post:*:reads`);

  return Array.from(pageViews).forEach((key) => {
    let pageStat = {
      views: parseInt(key[1]),
      time: parseInt(readingTime.get(key[0]) ?? '0'),
      reads: parseInt(pageReads.get(key[0]) ?? '0')
    }
    redis.set(`${prefix}:post:${key[0]}:page_stats`, JSON.stringify(pageStat));
  });
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