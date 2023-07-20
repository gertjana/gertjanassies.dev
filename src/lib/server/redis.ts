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
    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify({views: 1, reads: 0, time: 0, likes: 0}));
    return 0;
  }
}

export const incrementLikes = async (slug:string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    let json: PageStat = JSON.parse(pageStat);
    json.likes += 1;

    await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));

    return json.likes;
  } 
  return 0;
}

/** gets the stats for one page */
export const getPageStat = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    return JSON.parse(pageStat);
  } 
  return {views: 0, reads: 0, time: 0, likes: 0};
}


/** returns an array of PageStat's */
export const getPageStats: () => Promise<PageStat[]> = async () => {
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
