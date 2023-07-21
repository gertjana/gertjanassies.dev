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

type UpdateStatFieldType = <TValue>(slug: string, field: string, value: TValue) => Promise<TValue>;
type StatNumberFunction = (slug: string) => Promise<number>;
type PageStatFunction = (slug: string) => Promise<PageStat>;
type PageStatsFunction = () => Promise<PageStat[]>;

/** Update the reading time by counting the words in the content of the blog article and then dividing it by 200 Words/minute */
export const updateReadingTime = async (slug: string, content: string) => {
  if (dev) { prefix = "dev"; }

  const words = content.split(/\s/g).length;
  const readingTime = Math.ceil(words / 200);

  return updateStatField(slug, "time", readingTime);
}

/** increment the page reads */
export const incrPageReads: StatNumberFunction = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  return incrStatField(slug, "reads", 1);
}

/** Increments the page views by one */
export const incrementPageView: StatNumberFunction = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  return incrStatField(slug, "views", 1);
}

export const incrementLikes: StatNumberFunction = async (slug:string) => {
  if (dev) { prefix = "dev"; }

  return incrStatField(slug, "likes", 1);
}

/** gets the stats for one page */
export const getPageStat: PageStatFunction = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    return JSON.parse(pageStat);
  } 
  return {views: 0, reads: 0, time: 0, likes: 0};
}


/** returns an array of PageStat's */
export const getPageStats: PageStatsFunction = async () => {
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


const updateStatField: UpdateStatFieldType = async <TValue>(slug: string, field: string, value: TValue) => {
  if (dev) { prefix = "dev"; }

  console.log("updating stat field", slug, field, value);
  const stat = await redis.get(`${prefix}:post:${slug}:page_stats`);
  if (stat != null) {
    let json = JSON.parse(stat);
    json[field] = value;

    let result = await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));
    console.log("result", result);
    return json[field]; 
  }
  return value;
}

const incrStatField: UpdateStatFieldType = async <TValue>(slug: string, field: string, value: TValue) => {
  if (dev) { prefix = "dev"; }

  const stat = await redis.get(`${prefix}:post:${slug}:page_stats`);
  if (stat != null) {
    let json = JSON.parse(stat);
    json[field] += value;

    redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(json));
    return json[field]; 
  }
  return value;
}
