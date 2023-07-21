import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageStat } from '$lib/types';

let prefix = "prod";
const connection = process.env.REDIS_CONNECTION ?? "redis://localhost:6379";

const redis = new Redis(connection);    

type UpdatePageStatFunction  = (slug: string) => Promise<PageStat | undefined>;
type PageStatFunction        = (slug: string) => Promise<PageStat | undefined>;
type PageStatsFunction       = () => Promise<PageStat[]>;
type UpdateFieldFunction     = (slug: string, f: (stat:PageStat) => PageStat) => Promise<PageStat | undefined>;

/** Gets the calculated reading time for a blog post */
export const getReadingTime: (slug: string) => Promise<number> = async (slug: string) => {
  return parseInt((await redis.get(`${prefix}:post:${slug}:page_stats`)) ?? '0');
}

/** Update the reading time by counting the words in the content of the blog article and then dividing it by 200 Words/minute */
export const updateReadingTime = async (slug: string, content: string) => {
  const words = content.split(/\s/g).length;
  const readingTime = Math.ceil(words / 200);

  return updateField(slug, (stat) => { stat.time = readingTime; return stat; } );
}

/** increment the page reads */
export const incrPageReads: UpdatePageStatFunction = async (slug: string) => {
  return updateField(slug, (stat) => { stat.reads++; return stat; });
}

/** Increments the page views by one */
export const incrementPageView: UpdatePageStatFunction = async (slug: string) => {
  return updateField(slug, (stat) => { stat.views++; return stat; });
}

/* Increments the likes by one */
export const incrementLikes: UpdatePageStatFunction = async (slug:string) => {
  return updateField(slug, (stat) => { stat.likes++; return stat; });
}

/** gets the stats for one page */
export const getPageStat: PageStatFunction = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await redis.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    return JSON.parse(pageStat);
  } else {
    return insertPageStat(slug);
  }
}

export const insertPageStat: PageStatFunction = async (slug: string) => {
  if (dev) { prefix = "dev"; }

  const stat: PageStat = { slug: slug, reads: 0, views: 0, likes: 0, time: 0};
  
  let result = await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(stat));
  if (result != "OK") { return undefined; }
  return stat;
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

const updateField: UpdateFieldFunction = async (slug: string, f: (stat:PageStat) => PageStat): Promise<PageStat | undefined> => {
  if (dev) { prefix = "dev"; }

  const stat = await redis.get(`${prefix}:post:${slug}:page_stats`);
  if (stat != null) {
    let pageStat = JSON.parse(stat);

    pageStat = f(pageStat);

    let result = await redis.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(pageStat));
    if (result != "OK") { return undefined; }
    return pageStat; 
  }
  return undefined;
}
