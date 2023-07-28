import Redis from 'ioredis';
import { dev } from '$app/environment';
import type { PageStat } from '$lib/types';

let prefix = "prod";

type UpdatePageStatFunction  = (client: Redis, slug: string) => Promise<PageStat | undefined>;
type PageStatFunction        = (client: Redis, slug: string) => Promise<PageStat | undefined>;
type PageStatsFunction       = (client: Redis) => Promise<PageStat[]>;
type UpdateFieldFunction     = (client: Redis, slug: string, f: (stat:PageStat) => PageStat) => Promise<PageStat | undefined>;


export const getClient: () => Promise<Redis> = async () => {
 const connection = process.env.REDIS_CONNECTION;
  // console.log(connection);
  // if (connection) {
  //   console.log("creating redis client")
  return new Redis(connection ?? '');
  // } else {
  //   console.log("no redis connection string found");    
  //   return undefined;
  // }
};

/** Update the reading time by counting the words in the content of the blog article and then dividing it by 200 Words/minute */
export const updateReadingTime = async (client: Redis, slug: string, content: string) => {
  const words = content.split(/\s/g).length;
  const readingTime = Math.ceil(words / 200);

  return updateField(client, slug, (stat) => { stat.time = readingTime; return stat; } );
}

/** increment the page reads */
export const incrementPageReads: UpdatePageStatFunction = async (client: Redis, slug: string) => {
  return updateField(client, slug, (stat) => { stat.reads++; return stat; });
}

/** Increments the page views by one */
export const incrementPageView: UpdatePageStatFunction = async (client: Redis, slug: string) => {
  return updateField(client, slug, (stat) => { stat.views++; return stat; });
}

/* Increments the likes by one */
export const incrementLikes: UpdatePageStatFunction = async (client: Redis, slug:string) => {
  return updateField(client, slug, (stat) => { stat.likes++; return stat; });
}

/** gets the stats for one page */
export const getPageStat: PageStatFunction = async (client: Redis, slug: string) => {
  if (dev) { prefix = "dev"; }

  const pageStat = await client.get(`${prefix}:post:${slug}:page_stats`);

  if (pageStat != null) {
    return JSON.parse(pageStat);
  } else {
    return undefined;
  }
}

/** returns an array of PageStat's */
export const getPageStats: PageStatsFunction = async (client: Redis) => {
  if (dev) { prefix = "dev"; }

  const keys: string[] = await client.keys(`${prefix}:post:*:page_stats`);

  const values = (await client.mget(...keys)).map((value) => value ?? '{}'); 

  const stats = keys.map((key, index) => {
    const pageStat = JSON.parse(values[index]) as PageStat;
    pageStat.slug = key.split(":")[2];
    return pageStat;
  });

  return stats;
}

/** applies the function to the page stat, create a new stat if it doesn't exist */
const updateField: UpdateFieldFunction = async (client: Redis, slug: string, f: (stat:PageStat) => PageStat): Promise<PageStat | undefined> => {
  if (dev) { prefix = "dev"; }

  let stat = await client.get(`${prefix}:post:${slug}:page_stats`);
  if (stat == null) {
    stat = JSON.stringify({slug: slug, reads: 0, views: 0, likes: 0, time: 0});
  }

  let pageStat = f(JSON.parse(stat));

  let result = await client.set(`${prefix}:post:${slug}:page_stats`, JSON.stringify(pageStat));
  if (result != "OK") { return undefined; }
  return pageStat; 
}
